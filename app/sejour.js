import React from "react";
import Navbar from "@/components/Navbar";

export default function StayPlanner() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">Programmer un séjour</h1>
        <p className="mt-2 text-slate-600">
          Dites-nous où, quand et avec qui vous voyagez. Cette page est
          prête à être étendue avec un formulaire complet.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary">Destination</label>
            <input className="mt-1 w-full px-4 py-3 rounded-xl border border-black/10 bg-white" placeholder="Ville, région..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary">Arrivée</label>
              <input type="date" className="mt-1 w-full px-4 py-3 rounded-xl border border-black/10 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary">Départ</label>
              <input type="date" className="mt-1 w-full px-4 py-3 rounded-xl border border-black/10 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Voyageurs</label>
            <input type="number" min={1} className="mt-1 w-full px-4 py-3 rounded-xl border border-black/10 bg-white" />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-foreground">
            <i className="fa-solid fa-calendar-check"></i>
            <span>Planifier</span>
          </button>
        </form>
      </section>
    </div>
  );
}
