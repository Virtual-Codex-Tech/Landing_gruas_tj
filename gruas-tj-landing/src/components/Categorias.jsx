import React from "react";
import "../style/Categorias.css";
import { Car, Truck, Tractor, Wrench } from "lucide-react";

export default function Categorias() {
  return (
    <section className="categorias-container">
      <h2>Transportamos con cuidado y precisión</h2>

      <div className="categorias-grid">
        <div className="categoria-card">
          <div className="icono">
            <Car size={36} />
          </div>
          <p>Vehículos Livianos</p>
        </div>

        <div className="categoria-card">
          <div className="icono">
            <Truck size={36} />
          </div>
          <p>Vehículos Pesados</p>
        </div>

        <div className="categoria-card">
          <div className="icono">
            <Tractor size={36} />
          </div>
          <p>Maquinaria Agrícola</p>
        </div>

        <div className="categoria-card">
          <div className="icono">
            <Wrench size={36} />
          </div>
          <p>Maquinaria de Construcción</p>
        </div>
      </div>
    </section>
  );
}
