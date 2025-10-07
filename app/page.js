'use client';
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faMapLocationDot,
  faShieldHeart,
  faCalendarCheck,
  faAward,
  faHeadset,
  faMoneyCheck,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import CountUp from "@/components/CountUp";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import Image from "next/image";
import { cacheManager } from '@/lib/cache';
import PropertiesDisplay from "@/components/display";

const data = await cacheManager.get('key');
await cacheManager.set('key', data);

function Features() {
  const items = [
    {
      icon: faWandMagicSparkles,
      title: "Sélection soignée",
      text: "Des biens vérifiés, choisis pour leur design et leur confort.",
    },
    {
      icon: faMapLocationDot,
      title: "Emplacements d'exception",
      text: "Bord de mer, centre-ville ou nature : à vous de choisir.",
    },
    {
      icon: faShieldHeart,
      title: "Service fiable",
      text: "Assistance 7j/7 pour un séjour sans imprévu. Et suivi garanti.",
    },
  ];

  return (
    <AnimateIn index={0}>
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((f, i) => (
              <AnimateIn key={i} index={i + 1}>
                <div className="p-6 rounded-2xl bg-accent shadow-sm ring-1 ring-black/5 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg text-center">
                  <FontAwesomeIcon
                    icon={f.icon} 
                    className="text-white text-4xl mb-3"
                  />
                  <h3 className="mt-3 text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-white/80">{f.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </AnimateIn>
  );
}

function Popular() {
  const cards = [
    {
      img: "https://images.pexels.com/photos/7851903/pexels-photo-7851903.jpeg",
      title: "Villa Azur, Pointe-Noire",
      price: "à partir de 1500/nuit",
    },
    {
      img: "https://images.pexels.com/photos/19836794/pexels-photo-19836794.jpeg",
      title: "Loft Haussmann, Brazzaville",
      price: "à partir de 25000/nuit",
    },
    {
      img: "https://images.pexels.com/photos/19899071/pexels-photo-19899071.jpeg",
      title: "Chalet Edelweiss, Brazzaville",
      price: "à partir de 3000/nuit",
    },
    {
      img: "https://images.pexels.com/photos/7851903/pexels-photo-7851903.jpeg",
      title: "Villa Azur, Pointe-Noire",
      price: "à partir de 1500/nuit",
    },
    {
      img: "https://images.pexels.com/photos/19836794/pexels-photo-19836794.jpeg",
      title: "Loft Haussmann, Brazzaville",
      price: "à partir de 25000/nuit",
    },
    {
      img: "https://images.pexels.com/photos/19899071/pexels-photo-19899071.jpeg",
      title: "Chalet Edelweiss, Brazzaville",
      price: "à partir de 3000/nuit",
    },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Dupliquer les cartes pour un défilement infini fluide
  const duplicatedCards = [...cards, ...cards];

  // Défilement automatique
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 3000); // Change toutes les 3 secondes

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [cards.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-primary">
            Nos biens pour vos séjours
          </h2>
          <Link
            href="/sejour"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> 
            <span>Prevoir un séjour</span>
          </Link>
        </div>

        {/* Container de défilement */}
        <div className="relative">
          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all hidden md:flex"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all hidden md:flex"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {/* Grille avec défilement */}
          <div className="overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className="flex transition-transform duration-500 ease-in-out gap-5"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {duplicatedCards.map((c, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                >
                  <AnimateIn index={i + 1}>
                    <article className="group rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="aspect-[4/3] overflow-hidden">
                        <Image
                          src={c.img}
                          alt={c.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-primary">{c.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{c.price}</p>
                      </div>
                    </article>
                  </AnimateIn>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs de progression */}
          <div className="flex justify-center gap-2 mt-6">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'bg-primary' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bouton mobile */}
        <div className="flex justify-center mt-6 md:hidden">
          <Link
            href="/sejour"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> 
            <span>Prevoir un séjour</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Custom CountUp components with built-in formatting
function CustomCountUp({ type, ...props }) {
  switch (type) {
    case 'sejours':
      return (
        <CountUp
          {...props}
          formatType="custom"
          customFormat={(v) => `${Math.round(v / 100) / 10}k+`}
        />
      );
    case 'note':
      return (
        <CountUp
          {...props}
          formatType="custom"
          customFormat={(v) => `${(v / 10).toFixed(1)}`}
        />
      );
    default:
      return <CountUp {...props} />;
  }
}

export default function Index() {
  return (
    <main className="bg-gradient-to-b from-slate-50 to-white">
  
      <Header />
      <div className="h-6 md:h-10" />
      <Features />

     <PropertiesDisplay /> 

      <AnimateIn index={2}>
        <section className="py-12 bg-primary mb-5 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <AnimateIn index={1}>
                <div className="transform transition-all duration-700 hover:scale-105">
                  <div className="text-3xl font-extrabold text-white">
                    <CountUp end={120} duration={1000} />+
                  </div>
                  <div className="mt-2 text-sm text-white text-slate-600">Biens disponibles</div>
                </div>
              </AnimateIn>

              <AnimateIn index={2}>
                <div className="transform transition-all duration-700 hover:scale-105">
                  <div className="text-3xl font-extrabold text-white">
                    <CustomCountUp 
                      type="sejours"
                      end={8000} 
                      duration={1400} 
                    />
                  </div>
                  <div className="mt-2 text-sm text-white text-slate-600">Séjours réservés</div>
                </div>
              </AnimateIn>

              <AnimateIn index={3}>
                <div className="transform transition-all duration-700 hover:scale-105">
                  <div className="text-3xl font-extrabold text-white">
                    <CustomCountUp 
                      type="note"
                      end={49} 
                      duration={900} 
                      decimals={1} 
                    />
                  </div>
                  <div className="mt-2 text-sm text-white text-slate-600">Note moyenne</div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      </AnimateIn>

      <Popular />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-accent mb-6">Nos avantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateIn index={1}>
              <div className="p-6 rounded-2xl bg-accent shadow-sm ring-1 ring-black/5 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                 <FontAwesomeIcon icon={faAward} className="text-5xl text-white" />
                <h3 className="mt-3 text-lg font-semibold text-white">Qualité garantie</h3>
                <p className="mt-2 text-slate-600 text-white"> Biens inspectés et sélectionnés par nos experts.</p>
              </div>
            </AnimateIn>

            <AnimateIn index={2}>
              <div className="p-6 rounded-2xl bg-accent shadow-sm ring-1 ring-black/5 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
               <FontAwesomeIcon icon={faHeadset} className="text-5xl text-white" />
                <h3 className="mt-3 text-lg font-semibold text-white">Assistance 24/7</h3>
                <p className="mt-2 text-slate-600 text-white">Support disponible avant, pendant et après votre séjour.</p>
              </div>
            </AnimateIn>

            <AnimateIn index={3}>
              <div className="p-6 rounded-2xl bg-accent shadow-sm ring-1 ring-black/5 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <FontAwesomeIcon icon={faMoneyCheck} className="text-5xl text-white" />
                <h3 className="mt-3 text-lg font-semibold text-white">Paiement sécurisé</h3>
                <p className="mt-2 text-slate-600 text-white">Transactions chiffrées et politiques transparentes.</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        Suivez-nous sur les réseaux sociaux
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

      {/* Instagram */}
      <div className="text-center group">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
          <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
</svg>
          </div>
          <Link
            href="https://www.instagram.com/loge.connect?igsh=MWg4ZnU3Y2N6ZTIyOQ%3D%3D&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Instagram
          </Link>
        </div>
      </div>

      {/* TikTok */}
      <div className="text-center group">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
          <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </div>
          <Link
            href="https://www.tiktok.com/@logeconnect?_t=ZM-8zsl7X9jd9c&_r=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
           TikTok
          </Link>
        </div>
      </div>

      {/* Facebook */}
      <div className="text-center group">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
          <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <Link
            href="https://www.facebook.com/share/17U3Fcy6T7/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            Facebook
          </Link>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Prêt à trouver votre prochain chez-vous ?</h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/demande"
          className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          Demander un conseil
        </Link>
      </div>
    </div>
  </div>
</section>

<footer className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      {/* Brand */}
      <div className="md:col-span-2">
        <p className="mt-4 text-gray-400 text-lg">
          Votre partenaire de confiance pour trouver la propriété parfaite au Congo.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="https://www.instagram.com/loge.connect?igsh=MWg4ZnU3Y2N6ZTIyOQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
           <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
</svg>
          </a>
          <a href="https://www.tiktok.com/@logeconnect?_t=ZM-8zsl7X9jd9c&_r=1" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/share/17U3Fcy6T7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Liens rapides */}
      <div>
        <h4 className="font-semibold text-lg mb-4">Navigation</h4>
        <ul className="space-y-2">
          <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
          <li><Link href="/sejour" className="text-gray-400 hover:text-white transition-colors">Programmer un séjour </Link></li>
          <li><Link href="/demande" className="text-gray-400 hover:text-white transition-colors">Demander un conseil</Link></li>
        </ul>
      </div>

      {/* Informations */}
      <div>
        <h4 className="font-semibold text-lg mb-4">Informations</h4>
        <ul className="space-y-2">
          <li><a href="mailto:logeconnect7@gmail.com" className="text-gray-400 hover:text-white transition-colors">logeconnect7@gmail.com</a></li>
          <li><span className="text-gray-400">+242 xxxxxxxxx</span></li>
          <li><span className="text-gray-400">République du Congo</span></li>
        </ul>
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="text-gray-400 text-sm">
        <p>&copy; 2025 Loge Connect. Tous droits réservés.</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Link 
          href="https://magicandtech.netlify.app/" 
          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
        >
          <span>Développé par</span>
          <span className="bg-accent text-white px-2 py-1 rounded text-xs font-semibold">
            Magic And Tech
          </span>
        </Link>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}