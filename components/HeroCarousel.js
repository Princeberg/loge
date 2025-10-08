'use client';

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    image:
      "https://images.pexels.com/photos/13201426/pexels-photo-13201426.jpeg",
    title: "Des maisons en locations et en ventes",
    caption: "Découvrez votre nouveau chez vous.",
    type: "house"
  },
  {
    image:
      "https://images.pexels.com/photos/4857775/pexels-photo-4857775.jpeg",
    title: "Appartements élégants ",
    caption: "Explorez des appartements modernes et confortables pour vos vacances et séjours.",
    type: "apartment"
  },
  {
    image:
      "https://images.pexels.com/photos/7236957/pexels-photo-7236957.jpeg",
    title: "Des Bureaux et espaces commerciaux",
    caption: "Des espaces commerciaux parfaitement adaptés aux besoins de votre entreprise.",
    type: "office"
  },
];

// Composants SVG pour chaque type
const HouseIcon = ({ isActive }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={isActive ? "2.5" : "1.5"}
    className={`transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ApartmentIcon = ({ isActive }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={isActive ? "2.5" : "1.5"}
    className={`transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
  </svg>
);

const OfficeIcon = ({ isActive }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={isActive ? "2.5" : "1.5"}
    className={`transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}
  >
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <path d="M16 7V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="16" y2="16" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

// Composant pour rendre l'icône appropriée
const SlideIcon = ({ type, isActive }) => {
  switch (type) {
    case 'house':
      return <HouseIcon isActive={isActive} />;
    case 'apartment':
      return <ApartmentIcon isActive={isActive} />;
    case 'office':
      return <OfficeIcon isActive={isActive} />;
    default:
      return <HouseIcon isActive={isActive} />;
  }
};

export default function HeroCarousel() {
  const options = { 
    loop: true, 
    duration: 50,
    align: "start",
    dragFree: false,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index, true);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const id = setInterval(() => emblaApi?.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="relative z-0"> {/* z-index 0 pour l'arrière-plan */}
      <div className="absolute inset-0  from-black/40 via-black/20 to-black/40 z-10 pointer-events-none" />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-[70vh] md:h-[80vh]">
              <Image
                src={slide.image}
                alt={slide.title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                priority={i === 0}
              />
              <div className="absolute inset-0 z-10 flex items-end md:items-center justify-center md:justify-start">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-0">
                  <div className="max-w-xl md:max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="mt-2 md:mt-4 text-white/90 text-sm md:text-lg">
                      {slide.caption}
                    </p>
                    <div className="mt-4 md:mt-6 flex gap-2">
                      <Link
                        href="/demande"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-foreground shadow hover:opacity-95 transition"
                      >
                        <i className="fa-solid fa-building"></i>
                        <span>Laisser une demande</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="absolute z-20 bottom-44 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`p-2 transition-all duration-300 rounded-lg ${
              selectedIndex === i 
                ? "text-white bg-white/20 scale-110" 
                : "text-white/50 hover:text-white/70 hover:bg-white/10 scale-100"
            }`}
            aria-label={`Aller à ${slide.type === 'house' ? 'maison' : slide.type === 'apartment' ? 'appartement' : 'bureau'}`}
          >
            <SlideIcon type={slide.type} isActive={selectedIndex === i} />
          </button>
        ))}
      </div>
    </section>
  );
}