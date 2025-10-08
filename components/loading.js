// components/Loading.js
'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  // Positions prédéfinies pour éviter les différences serveur/client
  const particlePositions = [
    { left: '10%', top: '20%' },
    { left: '25%', top: '60%' },
    { left: '40%', top: '30%' },
    { left: '55%', top: '70%' },
    { left: '70%', top: '40%' },
    { left: '85%', top: '50%' },
    { left: '15%', top: '80%' },
    { left: '35%', top: '15%' },
    { left: '65%', top: '25%' },
    { left: '90%', top: '65%' },
    { left: '50%', top: '85%' },
    { left: '75%', top: '10%' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center space-y-8">
        
        {/* Animation de la maison avec FontAwesome */}
        <div className="relative">
          {/* Icône maison FontAwesome avec style 3D */}
          <div className="fa-3d">
            <FontAwesomeIcon 
              icon={faHouse} 
              className="text-primary"
              style={{ 
                fontSize: '5rem',
                filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.12))'
              }}
            />
          </div>
          
          {/* Effet de pulse autour de la maison */}
          <div className="absolute inset-0 w-24 h-24 -m-2 border-4 border-primary/20 rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Texte de chargement avec animation de vague */}
        <div className="flex space-x-1">
          {'Loge Connect'.split('').map((letter, index) => (
            <span
              key={index}
              className="text-primary font-semibold text-lg animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        {/* Barre de progression animée */}
        <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full animate-progress"></div>
        </div>

        {/* Particules flottantes avec positions prédéfinies */}
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((position, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-accent rounded-full opacity-60 animate-float"
              style={{
                animationDelay: `${i * 0.3}s`,
                left: position.left,
                top: position.top
              }}
            ></div>
          ))}
        </div>

        {/* Formes géométriques animées avec positions fixes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-8 w-4 h-4 border-2 border-primary/30 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-8 right-12 w-6 h-6 border-2 border-accent/30 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-12 right-8 w-3 h-3 bg-accent animate-bounce" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute bottom-12 left-12 w-5 h-5 border-2 border-primary/30 rotate-45 animate-ping" style={{ animationDuration: '3s' }}></div>
        </div>

      </div>
    </div>
  );
}