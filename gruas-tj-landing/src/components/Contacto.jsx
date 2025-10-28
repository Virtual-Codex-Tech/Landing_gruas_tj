import React from "react";
import "../style/Contacto.css";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contacto() {
  return (
    <section className="contacto-container">
      <h2>Contáctanos</h2>
      <p className="contacto-subtitle">
        ¿Necesitas un servicio? Estamos listos para ayudarte. Ponte en contacto con nosotros.
      </p>

      <div className="contacto-content">
        {/* Información */}
        <div className="contacto-info">
          <div className="info-item">
            <Phone size={22} />
            <div>
              <h4>Teléfono</h4>
              <p>+57 123 456 7890</p>
            </div>
          </div>

          <div className="info-item">
            <Mail size={22} />
            <div>
              <h4>Email</h4>
              <p>contacto@gruasjtservice.com</p>
            </div>
          </div>

          <div className="info-item">
            <MapPin size={22} />
            <div>
              <h4>Ubicación</h4>
              <p>Bogotá, Colombia</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form className="contacto-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Mensaje" rows="4" required></textarea>
          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
}
