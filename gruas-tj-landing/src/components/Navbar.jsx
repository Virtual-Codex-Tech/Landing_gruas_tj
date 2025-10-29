import React, { useState } from 'react';
import './../style/Navbar.css';
import logo from '../assets/logo.png'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav>
            <div className="container-logo">
                <img src={logo} alt="logo" />
                <h2>GRÚAS TJ SERVICE</h2>
            </div>
            
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <div className={`container-links ${isMenuOpen ? 'active' : ''}`}>
                <a href="#" onClick={closeMenu}>Inicio</a>
                <a href="#somos" onClick={closeMenu}>Nosotros</a>
                <a href="#servicios" onClick={closeMenu}>Servicios</a>
                <a href="#contacto" onClick={closeMenu}>Contacto</a>
            </div>
        </nav>
    )
}