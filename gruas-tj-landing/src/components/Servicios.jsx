import React from 'react';
import '../style/Servicios.css';
import planchon from '../assets/planchon.webp'
import ninera from '../assets/niñera.jpg'
import gancho from '../assets/gancho.jpeg'

export default function Servicios() {
  return (
    <div className="container-services">
      <h2>Nuestros servicios</h2>

      <div className="cards-wrapper">
        <div className="container-card">
          <div className="container-card-image">
            <img src={planchon} alt="Grúa Planchón" />
          </div>
          <div className="container-card-text">
            <h3>Grúa Planchón</h3>
            <p>Ideal para vehículos de todo tipo, garantizando un transporte seguro y sin daños.</p>
          </div>
        </div>

        <div className="container-card">
          <div className="container-card-image">
            <img src={ninera} alt="Grúa Niñera" />
          </div>
          <div className="container-card-text">
            <h3>Grúa Niñera</h3>
            <p>Transporte de múltiples vehículos de forma simultánea, perfecto para concesionarios.</p>
          </div>
        </div>

        <div className="container-card">
          <div className="container-card-image">
            <img src={gancho} alt="Grúa con Gancho" />
          </div>
          <div className="container-card-text">
            <h3>Grúa con Gancho</h3>
            <p>Para rescates y movilización de vehículos en situaciones complicadas y de difícil acceso.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
