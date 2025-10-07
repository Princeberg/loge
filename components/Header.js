import React from "react";
import Navbar from "./Navbar";
import HeroCarousel from "./HeroCarousel";

export default function Header() {
  return (
    <div className="relative">
      <Navbar transparent />
      <HeroCarousel />
    </div>
  );
}
