import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DispositifLocalisation.css'; // Crée ce fichier pour le style

const DispositifLocalisation = () => {
  useEffect(() => {
    // Initialise la carte
    const map = L.map('map').setView([12.6392, -8.0029], 13); // Coordonnées par défaut (ex. Bamako)

    // Ajoute la couche de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajoute un marker à la position de base
    const marker = L.marker([
        12.630797602820438, -8.0269231037889]).addTo(map);
    marker.bindPopup("dispositifs").openPopup();
    

    return () => {
      map.remove(); // Nettoie la carte lorsqu'on quitte la page
    };
  }, []);

  return (
    <div className="dispositif-localisation-container">
      <h1>Localisation des dispositifs</h1>
      <div id="map" className="map-container"></div>
    </div>
  );
};

export default DispositifLocalisation;
