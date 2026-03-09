import React from "react";
import { Routes, Route } from 'react-router-dom';
import Menu from "./components/appel-component/Menu";
import Footer from "./components/appel-component/Footer";
import Accueil from "./components/pages/Accueil";
import APropos from "./components/pages/a-propos";
import Services from "./components/pages/services";
import RendezVous from "./components/pages/rendez-vous";
import Contact from "./components/pages/contact";

export default function App() {
  return (
    <div className="">
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/services" element={<Services />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}