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

  async set(key, data, customTTL = null) {
    if (!this.isBrowser) {
      console.warn('Cache set called on server side');
      return;
    }
    
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl: customTTL || this.defaultTTL
      };
      await set(key, cacheData);
      await this.cleanup();
    } catch (error) {
      console.warn('Cache set error:', error);
    }
  }

  async get(key) {
    if (!this.isBrowser) {
      console.warn('Cache get called on server side');
      return null;
    }
    
    try {
      const cached = await get(key);
      if (!cached) return null;

      const isExpired = Date.now() - cached.timestamp > cached.ttl;
      if (isExpired) {
        await this.delete(key);
        return null;
      }

      return cached.data;
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  async getWithFallback(key, fallbackFunction, customTTL = null) {
    if (!this.isBrowser) {
      // On server side, directly call fallback
      return fallbackFunction ? await fallbackFunction() : null;
    }
    
    try {
      const cached = await this.get(key);
      if (cached) return cached;

      if (fallbackFunction && typeof fallbackFunction === 'function') {
        const freshData = await fallbackFunction();
        if (freshData !== undefined && freshData !== null) {
          await this.set(key, freshData, customTTL);
        }
        return freshData;
      }

      return null;
    } catch (error) {
      console.warn('Cache getWithFallback error:', error);
      return fallbackFunction ? await fallbackFunction() : null;
    }
  }

  async delete(key) {
    if (!this.isBrowser) return;
    
    try {
      await del(key);
    } catch (error) {
      console.warn('Cache delete error:', error);
    }
  }

  async clear() {
    if (!this.isBrowser) return;
    
    try {
      await clear();
    } catch (error) {
      console.warn('Cache clear error:', error);
    }
  }

  async cleanup() {
    if (!this.isBrowser) return;
    
    try {
      const allKeys = await keys();
      if (allKeys.length <= this.maxItems) return;

      const itemsToDelete = allKeys.length - this.maxItems;
      const keysToDelete = allKeys.slice(0, itemsToDelete);
      
      await Promise.all(keysToDelete.map(k => this.delete(k)));
    } catch (error) {
      console.warn('Cache cleanup error:', error);
    }
  }

  async getStats() {
    if (!this.isBrowser) return { totalItems: 0, maxItems: this.maxItems };
    
    try {
      const allKeys = await keys();
      return {
        totalItems: allKeys.length,
        maxItems: this.maxItems
      };
    } catch (error) {
      console.warn('Cache stats error:', error);
      return null;
    }
  }
}

export const cacheManager = new CacheManager();