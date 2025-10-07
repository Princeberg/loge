import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <p className="text-lg text-slate-600 mb-6">Oups ! Page introuvable.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground"
        >
          <i className="fa-solid fa-house"></i>
          <span>Retour à l’accueil</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
