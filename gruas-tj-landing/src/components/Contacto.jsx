import React, { useState } from "react";
import "../style/Contacto.css";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contacto() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Estado de envío
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState("");

  // Manejar cambios de los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEstado("");

    try {
      // Llamar al backend Node (cambia localhost por tu dominio en producción)
      const res = await fetch("https://servemail.vercel.app//send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setEstado("✅ Mensaje enviado correctamente.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setEstado("❌ Error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch (err) {
      console.error(err);
      setEstado("⚠️ No se pudo conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

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
              <p>+57 322 790 2333 </p>
            </div>
          </div>

          <div className="info-item">
            <Mail size={22} />
            <div>
              <h4>Email</h4>
              <p>GRUASTJSERVICE@GMAIL.COM</p>
            </div>
          </div>

          <div className="info-item">
            <MapPin size={22} />
            <div>
              <h4>Ubicación</h4>
              <p>Norte De Santander CUCUTA CALLE 12 AN 9A 19 CARLOS PIZARRO</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form className="contacto-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar Mensaje"}
          </button>

          {/* Mensaje de estado */}
          {estado && <p className="mensaje-status">{estado}</p>}
        </form>
      </div>
    </section>
  );
}
