import React, { useState } from "react";
import "../style/Contacto.css";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEstado("");

    // Validaciones
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setEstado("❌ Por favor, completa todos los campos.");
      setEnviando(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEstado("❌ Por favor, ingresa un email válido.");
      setEnviando(false);
      return;
    }

    if (formData.message.trim().length < 10) {
      setEstado("❌ El mensaje debe tener al menos 10 caracteres.");
      setEnviando(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Nombre', formData.name);
      formDataToSend.append('Enviado desde', formData.email);
      formDataToSend.append('Mensaje enviado', formData.message);
      formDataToSend.append('_subject', `Nuevo mensaje de ${formData.name} - Grúas TJ Service`);
      formDataToSend.append('_replyto', formData.email);
      
      // Configuración para personalizar el email
      formDataToSend.append('_cc', formData.email); // Enviar copia al usuario
      formDataToSend.append('_autoresponse', 'Gracias por contactar a Grúas TJ Service. Te responderemos pronto.');

      const res = await fetch('https://formsubmit.co/ajax/jdjjz19@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        setEstado("✅ Mensaje enviado correctamente. Te contactaremos pronto.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || 'Error en el envío');
      }

    } catch (error) {
      console.error('Error al enviar:', error);
      setEstado("❌ Error al enviar el mensaje. Intenta nuevamente.");
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
              <p>+57 322 790 2333</p>
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
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={enviando}
              minLength={2}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email de contacto"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={enviando}
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Describe tu solicitud o servicio requerido..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={enviando}
              minLength={10}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={enviando}
            className={enviando ? 'enviando' : ''}
          >
            {enviando ? (
              <>
                <div className="spinner"></div>
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </button>

          {estado && (
            <div className={`mensaje-status ${estado.includes('✅') ? 'success' : 'error'}`}>
              {estado}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}