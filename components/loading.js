// components/Loading.js
'use client';

import { useEffect, useState } from 'react';
import '../style/loading.css';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      {/* Animation principale */}
      <div className="loading-container">
        
        {/* Logo animé */}
        <div className="logo-animation">
          <div className="logo-circle">
            <div className="logo-inner"></div>
          </div>
          <div className="logo-pulse"></div>
        </div>

        {/* Texte de chargement avec animation de vague */}
        <div className="loading-text">
          <span className="text-wave">L</span>
          <span className="text-wave">o</span>
          <span className="text-wave">g</span>
          <span className="text-wave">e</span>
          <span className="text-wave"></span>
          <span className="text-wave">C</span>
          <span className="text-wave">o</span>
          <span className="text-wave">n</span>
          <span className="text-wave">n</span>
          <span className="text-wave">e</span>
          <span className="text-wave">c</span>
          <span className="text-wave">t</span>
        </div>

        {/* Barre de progression animée */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>

        {/* Particules flottantes */}
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>

        {/* Formes géométriques animées */}
        <div className="geometric-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

      </div>
    </div>
  );
}