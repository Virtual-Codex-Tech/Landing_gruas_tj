import React from 'react';
import './../style/Navbar.css';
import logo from '../assets/logo.png'

export default function Navbar() {
    return (
        <nav>
            <div className="container-logo">
                <img src={logo} alt="logo" />
                <h2>GRÚAS TJ SERVICE</h2>
            </div>
            <div className="container-links">
                <a href="#">Inicio</a>
                <a href="#">Servicios</a>
                <a href="#">Nosotros</a>
                <a href="#">Contacto</a>
            </div>
        </nav>
    )
}