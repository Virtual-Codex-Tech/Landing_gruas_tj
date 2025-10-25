import React from "react";
import "../style/Footer.css";
import logo from '../assets/logo.png'
import { Phone, Mail, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Logo" />
        <span>GRÚAS TJ SERVICE</span>
      </div>

      <div className="footer-right">
        <span>+57 123 456 7890</span>
        <span>contacto@gruasjtservice.com</span>
      </div>
    </footer>
  );
}
