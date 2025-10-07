import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faHouse, faUserCircle } from '@fortawesome/free-solid-svg-icons';
export default function Navbar({ transparent = false }) {
  return (
    <header
      className={`${transparent ? "bg-transparent" : "bg-white/90 backdrop-blur"} sticky top-0 z-40 border-b border-black/5`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3"> 
          <Link href="/" className="flex items-center gap-2">
           <Logo size="xl" />
          </Link>

          <nav className="hidden md:flex items-center gap-3">
            <Link
              href="/demande"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition btn-3d"
            >
              <FontAwesomeIcon icon={faHouse} className="text-white" />
              <span> Faire une demande </span>
            </Link>

            <Link
              href="/sejour"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:opacity-95 transition btn-3d"
            >
               <FontAwesomeIcon icon={faCalendarCheck} className="text-white" />
              <span>Programmer un séjour</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition btn-3d"
            >
                <FontAwesomeIcon icon={faUserCircle} className="text-primary" />
              <span>Connexion</span>
            </Link>
          </nav>

          {/* Version mobile - uniquement les icônes sans texte */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="./demande"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground touch-target btn-3d"
              aria-label="Faire une demande"
            >
             <FontAwesomeIcon icon={faHouse} className="text-white" />
            </Link>

            <Link
              href="./sejour"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground touch-target btn-3d"
              aria-label="Programmer un séjour"
            >
             <FontAwesomeIcon icon={faCalendarCheck} className="text-white" />
            </Link>

            <Link
              href="./login"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 text-primary touch-target btn-3d"
              aria-label="Connexion"
            >
             <FontAwesomeIcon icon={faUserCircle} className="text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}