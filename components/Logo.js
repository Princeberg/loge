import React from "react";
import Image from "next/image";

export function Logo({ className, size = "xl" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-40 h-40" // Nouvelle taille XL
  };

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Loge Connect">
      <div className={`relative ${sizeClasses[size]} shrink-0`}>
        <Image 
          src="/logo.png"
          fill
          alt="Loge Connect Logo"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

export default Logo;