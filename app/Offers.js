import React from "react";
import Navbar from "@/components/Navbar";

export default function Offers() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">Nos offres</h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Parcourez notre sélection de biens. Cette page est prête à être
          personnalisée selon vos critères (filtres, carte, etc.).
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-slate-200" />
              <div className="p-4">
                <div className="h-4 w-2/3 bg-slate-200 rounded" />
                <div className="mt-2 h-3 w-1/2 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
