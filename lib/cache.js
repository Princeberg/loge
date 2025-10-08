// lib/cache.js
import { get, set, del, keys, clear } from 'idb-keyval';

const CACHE_TTL = 30 * 60 * 1000;
const MAX_CACHE_ITEMS = 2000;

class CacheManager {
  constructor() {
    this.defaultTTL = CACHE_TTL;
    this.maxItems = MAX_CACHE_ITEMS;
    this.isBrowser = typeof window !== 'undefined';
  }

  // Validation des paramètres avec valeurs par défaut
  validateParams(namespace, key, data, methodName = '') {
    const validNamespace = namespace || 'default';
    
    if (!key) {
      console.warn(`Cache ${methodName}: Key is required`);
      return { isValid: false };
    }
    
    const validKey = String(key).trim();
    if (validKey === '') {
      console.warn(`Cache ${methodName}: Key cannot be empty`);
      return { isValid: false };
    }

    if (data === undefined) {
      console.warn(`Cache ${methodName}: Data cannot be undefined`);
      return { isValid: false };
    }

    return { 
      isValid: true, 
      namespace: validNamespace, 
      key: validKey 
    };
  }

  // Méthode pour créer une clé avec namespace
  createKey(namespace, key) {
    return `${namespace}:${key}`;
  }

  async set(namespace, key, data, customTTL = null) {
    if (!this.isBrowser) {
      console.warn('Cache set called on server side');
      return false;
    }
    
    try {
      const validation = this.validateParams(namespace, key, data, 'set');
      if (!validation.isValid) return false;
      
      const { namespace: validNamespace, key: validKey } = validation;
      const cacheKey = this.createKey(validNamespace, validKey);
      
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl: customTTL || this.defaultTTL,
        namespace: validNamespace
      };
      
      await set(cacheKey, cacheData);
      await this.cleanup();
      
      console.log(`Cache set: ${cacheKey}`, data);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async get(namespace, key) {
    if (!this.isBrowser) {
      console.warn('Cache get called on server side');
      return null;
    }
    
    try {
      if (!key) {
        console.warn('Cache get: Key is required');
        return null;
      }
      
      const validNamespace = namespace || 'default';
      const validKey = String(key).trim();
      
      if (validKey === '') {
        console.warn('Cache get: Key cannot be empty');
        return null;
      }
      
      const cacheKey = this.createKey(validNamespace, validKey);
      const cached = await get(cacheKey);
      
      if (!cached) {
        console.log(`Cache miss: ${cacheKey}`);
        return null;
      }

      const isExpired = Date.now() - cached.timestamp > cached.ttl;
      if (isExpired) {
        console.log(`Cache expired: ${cacheKey}`);
        await this.delete(validNamespace, validKey);
        return null;
      }

      console.log(`Cache hit: ${cacheKey}`, cached.data);
      return cached.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async getWithFallback(namespace, key, fallbackFunction, customTTL = null) {
    if (!this.isBrowser) {
      return fallbackFunction ? await fallbackFunction() : null;
    }
    
    try {
      if (!key) {
        console.warn('Cache getWithFallback: Key is required');
        return fallbackFunction ? await fallbackFunction() : null;
      }

      const validNamespace = namespace || 'default';
      const validKey = String(key).trim();
      
      if (validKey === '') {
        console.warn('Cache getWithFallback: Key cannot be empty');
        return fallbackFunction ? await fallbackFunction() : null;
      }

      const cached = await this.get(validNamespace, validKey);
      if (cached !== null) {
        return cached;
      }

      if (fallbackFunction && typeof fallbackFunction === 'function') {
        console.log(`Cache fallback: ${validNamespace}:${validKey}`);
        const freshData = await fallbackFunction();
        
        if (freshData !== undefined && freshData !== null) {
          await this.set(validNamespace, validKey, freshData, customTTL);
        }
        
        return freshData;
      }

      return null;
    } catch (error) {
      console.error('Cache getWithFallback error:', error);
      return fallbackFunction ? await fallbackFunction() : null;
    }
  }

  async delete(namespace, key) {
    if (!this.isBrowser) return false;
    
    try {
      if (!key) {
        console.warn('Cache delete: Key is required');
        return false;
      }
      
      const validNamespace = namespace || 'default';
      const validKey = String(key).trim();
      
      if (validKey === '') {
        console.warn('Cache delete: Key cannot be empty');
        return false;
      }
      
      const cacheKey = this.createKey(validNamespace, validKey);
      await del(cacheKey);
      console.log(`Cache deleted: ${cacheKey}`);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  // Supprimer tout un namespace
  async clearNamespace(namespace) {
    if (!this.isBrowser) return;
    
    try {
      const validNamespace = namespace || 'default';
      const allKeys = await keys();
      const namespaceKeys = allKeys.filter(key => 
        key.startsWith(`${validNamespace}:`)
      );
      
      await Promise.all(namespaceKeys.map(k => del(k)));
      console.log(`Cache namespace cleared: ${validNamespace}`);
    } catch (error) {
      console.error('Cache clearNamespace error:', error);
    }
  }

  async clear() {
    if (!this.isBrowser) return;
    
    try {
      await clear();
      console.log('Cache completely cleared');
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  async cleanup() {
    if (!this.isBrowser) return;
    
    try {
      const allKeys = await keys();
      if (allKeys.length <= this.maxItems) return;

      const keysWithTimestamps = await Promise.all(
        allKeys.map(async (key) => {
          try {
            const cached = await get(key);
            return { key, timestamp: cached?.timestamp || 0 };
          } catch {
            return { key, timestamp: 0 };
          }
        })
      );

      keysWithTimestamps.sort((a, b) => a.timestamp - b.timestamp);
      
      const itemsToDelete = keysWithTimestamps.length - this.maxItems;
      const keysToDelete = keysWithTimestamps
        .slice(0, Math.max(0, itemsToDelete))
        .map(item => item.key);
      
      await Promise.all(keysToDelete.map(k => del(k)));
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }

  async getStats() {
    if (!this.isBrowser) return { totalItems: 0, maxItems: this.maxItems, namespaces: {} };
    
    try {
      const allKeys = await keys();
      const namespaces = {};
      
      for (const key of allKeys) {
        const namespace = key.split(':')[0] || 'default';
        namespaces[namespace] = (namespaces[namespace] || 0) + 1;
      }

      return {
        totalItems: allKeys.length,
        maxItems: this.maxItems,
        namespaces
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return null;
    }
  }

  // Méthodes spécifiques pour les produits avec validation améliorée
  async setProduit(key, data, customTTL = null) {
    return this.set('produits', key, data, customTTL);
  }

  async getProduit(key) {
    return this.get('produits', key);
  }

  async getProduitWithFallback(key, fallbackFunction, customTTL = null) {
    return this.getWithFallback('produits', key, fallbackFunction, customTTL);
  }

  async deleteProduit(key) {
    return this.delete('produits', key);
  }

  async clearProduits() {
    return this.clearNamespace('produits');
  }
}

export const cacheManager = new CacheManager();