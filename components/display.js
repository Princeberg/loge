'use client';
import React from "react";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand, faHeart, faBed, faBath,
  faRulerCombined, faMapMarkerAlt, faSync,
  faArrowRight, faTimes, faArrowLeft, faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import noDataFoundAnimation from "@/lotties/no-data.json";
import supabase from '@/lib/supabase';
import { cacheManager } from '@/lib/cache';

export default function PropertiesDisplay() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyImages, setPropertyImages] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    ville: '',
    type: '',
    status: '',
    prixMin: '',
    prixMax: ''
  });
  const [currentSlideIndex, setCurrentSlideIndex] = useState({});

  // Charger les produits depuis le cache ou Supabase
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      // Essayer de récupérer depuis le cache d'abord
      const cachedData = await cacheManager.getProduit('all-properties');
      
      if (cachedData) {
        console.log('Données récupérées du cache');
        setProperties(cachedData);
        setFilteredProperties(cachedData);
        initializeSlides(cachedData);
        setLoading(false);
        return;
      }

      // Si pas en cache, charger depuis Supabase
      console.log('Chargement depuis Supabase...');
      const { data, error } = await supabase
        .from('Produits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const propertiesData = data || [];
      
      // Stocker dans le cache
      await cacheManager.setProduit('all-properties', propertiesData, 15 * 60 * 1000); // 15 minutes
      
      setProperties(propertiesData);
      setFilteredProperties(propertiesData);
      initializeSlides(propertiesData);
      
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialiser les index de slide pour chaque propriété
  const initializeSlides = (propertiesData) => {
    const initialSlides = {};
    propertiesData?.forEach(property => {
      initialSlides[property.id] = 0;
    });
    setCurrentSlideIndex(initialSlides);
  };

  // Fonction pour forcer le rechargement (ignorer le cache)
  const refreshProperties = async () => {
    // Supprimer le cache pour forcer le rechargement
    await cacheManager.deleteProduit('all-properties');
    await fetchProperties();
  };

  // Charger au montage du composant
  useEffect(() => {
    fetchProperties();
  }, []);

  // Appliquer les filtres et la recherche
  useEffect(() => {
    let filtered = properties;

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.ville?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.localisation?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par ville
    if (filters.ville) {
      filtered = filtered.filter(property =>
        property.ville?.toLowerCase() === filters.ville.toLowerCase()
      );
    }

    // Filtre par type
    if (filters.type) {
      filtered = filtered.filter(property =>
        property.type?.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filtre par statut
    if (filters.status) {
      filtered = filtered.filter(property =>
        property.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Filtre par prix minimum
    if (filters.prixMin) {
      filtered = filtered.filter(property => {
        const prix = parseFloat(property.prix?.replace(/[^\d,]/g, '').replace(',', '.'));
        return prix >= parseFloat(filters.prixMin);
      });
    }

    // Filtre par prix maximum
    if (filters.prixMax) {
      filtered = filtered.filter(property => {
        const prix = parseFloat(property.prix?.replace(/[^\d,]/g, '').replace(',', '.'));
        return prix <= parseFloat(filters.prixMax);
      });
    }

    setFilteredProperties(filtered);
  }, [properties, searchQuery, filters]);

  // Charger les données au montage du composant
  useEffect(() => {
    fetchProperties();
  }, []);

  // Gestion du carousel automatique pour chaque propriété
  useEffect(() => {
    const intervals = {};

    filteredProperties.forEach(property => {
      const images = getPropertyImages(property);
      if (images.length > 1) {
        intervals[property.id] = setInterval(() => {
          setCurrentSlideIndex(prev => ({
            ...prev,
            [property.id]: (prev[property.id] + 1) % images.length
          }));
        }, 8000); // 8 secondes
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [filteredProperties]);

  const toggleLike = (id) => {
    setLikedProperties(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openModal = (img, imgs = [], i = 0) => {
    setSelectedImage(img);
    setPropertyImages(imgs);
    setCurrentImageIndex(i);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setPropertyImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!propertyImages.length) return;
    const i = (currentImageIndex + 1) % propertyImages.length;
    setCurrentImageIndex(i);
    setSelectedImage(propertyImages[i]);
  };

  const prevImage = () => {
    if (!propertyImages.length) return;
    const i = (currentImageIndex - 1 + propertyImages.length) % propertyImages.length;
    setCurrentImageIndex(i);
    setSelectedImage(propertyImages[i]);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getPropertyImages = (property) => {
    const images = [];
    if (property.image1) images.push(property.image1);
    if (property.image2) images.push(property.image2);
    if (property.image3) images.push(property.image3);
    return images.length > 0 ? images : ['/placeholder-image.jpg'];
  };

  const goToSlide = (propertyId, index) => {
    setCurrentSlideIndex(prev => ({
      ...prev,
      [propertyId]: index
    }));
  };

  // Récupérer les villes uniques pour les options du filtre
  const uniqueVilles = [...new Set(properties.map(p => p.ville).filter(Boolean))];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Barre de recherche et filtres */}
      <div className="mb-6 space-y-4">
        {/* Barre de recherche */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une propriété..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Bouton filtre mobile */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition md:hidden"
          >
            <FontAwesomeIcon icon={faFilter} />
            Filtres
          </button>

          <button
            onClick={fetchProperties}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition"
          >
            <FontAwesomeIcon icon={faSync} className="text-gray-500" />
            Actualiser
          </button>
        </div>

        {/* Filtres */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
          <select
            value={filters.ville}
            onChange={(e) => handleFilterChange('ville', e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Toutes les villes</option>
            {uniqueVilles.map(ville => (
              <option key={ville} value={ville}>{ville}</option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tous les types</option>
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
            <option value="Bureau">Bureau</option>
            <option value="Autre">Autre</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="Vente">À vendre</option>
            <option value="Location">À louer</option>
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Prix min"
              value={filters.prixMin}
              onChange={(e) => handleFilterChange('prixMin', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Prix max"
              value={filters.prixMax}
              onChange={(e) => handleFilterChange('prixMax', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Header résultats */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="text-gray-700 text-center sm:text-left">
          <p className="text-lg font-semibold">
            {filteredProperties.length} propriété{filteredProperties.length > 1 ? 's' : ''} trouvée{filteredProperties.length > 1 ? 's' : ''}{' '}
            {searchQuery && (
              <span className="text-gray-500 font-normal">pour "{searchQuery}"</span>
            )}
          </p>
        </div>
      </div>

      {/* Loading / Error / Empty */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="loader mb-3 border-4 border-gray-300 border-t-primary-500 rounded-full w-10 h-10 animate-spin" />
          <p>Chargement des propriétés...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Lottie animationData={noDataFoundAnimation} loop={false} style={{ width: 180 }} />
          <h3 className="text-xl font-semibold mt-4 text-gray-800">Erreur de chargement</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button onClick={fetchProperties} className="px-5 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
            <FontAwesomeIcon icon={faSync} className="mr-2" />
            Réessayer
          </button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Lottie animationData={noDataFoundAnimation} loop={true} style={{ width: 180 }} />
          <h3 className="text-xl font-semibold mt-4 text-gray-800">Aucune propriété trouvée</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? `Aucun résultat pour "${searchQuery}". Essayez d'autres termes.`
              : 'Aucune propriété disponible pour le moment.'}
          </p>
        </div>
      ) : (
        /* Grid des propriétés */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const images = getPropertyImages(property);
            const currentIndex = currentSlideIndex[property.id] || 0;
            const currentImage = images[currentIndex];
            
            return (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                <div className="relative group">
                  {/* Carousel d'images */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={currentImage}
                      alt={property.nom}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    
                    {/* Indicateurs de slide */}
                    {images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToSlide(property.id, index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentIndex 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Boutons d'action */}
                  <button
                    onClick={() => openModal(currentImage, images, currentIndex)}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <FontAwesomeIcon icon={faExpand} className="text-xl" />
                  </button>

                  
                  {/* Badge type et status */}
                  <div className="absolute top-3 left-3 flex gap-1 bg-black/70 rounded-full">
                    <span className=" text-white text-xs px-2 py-1 ">
                      {property.type}
                    </span>
                
                  </div>

                  <span className={`text-xs px-2 py-1 rounded-full absolute top-3 right-3  ${
                      property.status === 'Vente' 
                        ? 'bg-[#26294a] text-white' 
                        : 'bg-[#b05229] text-white'
                    }`}>
                      {property.status}
                    </span>

                  {/* Prix */}
                  <div className="absolute bottom-3 right-3 bg-[#b05229] text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {property.prix}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {property.nom}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                      {property.localisation}, {property.ville}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {property.description}
                    </p>
              
                    <div className="flex items-center justify-between text-gray-700 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faBed} />
                        <span>{property.chambres} Ch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faBath} />
                        <span>{property.sdb} Sdb</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faRulerCombined} />
                        <span>{property.surface}m²</span>
                      </div>
                    </div> 

                  <div className="mt-4 md:mt-6">
  <Link 
    href="/demande"
    className="inline-flex items-center gap-2 bg-[#26294a] hover:bg-[#26294a] 
    text-white px-4 py-2 rounded-xl font-medium transition" > 
    <span>En savoir plus</span>
    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
  </Link> 
</div> 
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal d'image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-3">
          <div className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white text-2xl z-10"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {propertyImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-xl z-10"
                  onClick={prevImage}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl z-10"
                  onClick={nextImage}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
                  {currentImageIndex + 1}/{propertyImages.length}
                </div>
              </>
            )}
            <Image
              src={selectedImage}
              alt="Aperçu"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}