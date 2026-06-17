import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import './Sidebar.css';
import Profil from '../assets/profil.webp';

export default function Sidebar() {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {/* En mobile : layout horizontal (photo + info) */}
        <div className="sidebar-header">
          {/* Photo de profil */}
          <div className="profile-photo">
            <img 
              src= {Profil} 
              alt="silué kanigui Moise"
            />
          </div>

          {/* Info profil (nom + titre) */}
          <div className="profile-info">
            <h2 className="profile-name">Silué Kanigui Moise</h2>
            <p className="profile-title">Ingenieur Logiciel</p>
          </div>
        </div>

        {/* Bouton toggle pour mobile */}
        <button 
          className="toggle-contacts-btn"
          onClick={() => setShowContacts(!showContacts)}
          aria-label="Afficher/masquer les contacts"
        >
          {showContacts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {/* Trait de séparation */}
        <hr className="divider" />

        {/* Informations de contact (visible en desktop, toggle en mobile) */}
        <div className={`contact-info ${showContacts ? 'visible' : ''}`}>
          {/* Email */}
          <div className="contact-item">
            <div className="icon-box">
              <Mail className="icon" />
            </div>
            <div className="contact-text">
              <p className="contact-label">EMAIL</p>
              <p className="contact-value">kanigui43@gmail.com</p>
            </div>
          </div>

          {/* Téléphone */}
          <div className="contact-item">
            <div className="icon-box">
              <Phone className="icon" />
            </div>
            <div className="contact-text">
              <p className="contact-label">PHONE</p>
              <p className="contact-value">+225 07 57 10 98 35</p>
              <p className="contact-value">+225 05 05 05 15 70</p>
            </div>
          </div>

          {/* Nationalité */}
          <div className="contact-item">
            <div className="icon-box">
              <Flag className="icon" />
            </div>
            <div className="contact-text">
              <p className="contact-label">NATIONALITÉ</p>
              <p className="contact-value">Ivoirienne</p>
            </div>
          </div>

          {/* Location */}
          <div className="contact-item">
            <div className="icon-box">
              <MapPin className="icon" />
            </div>
            <div className="contact-text">
              <p className="contact-label">LOCATION</p>
              <p className="contact-value">Abidjan et Ferké</p>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="contact-item linkedin-contact">
            <a
              href="https://www.linkedin.com/in/kanigui-moise-silu%C3%A9-081989319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link-inline"
            >
              <div className="icon-box">
                <Linkedin className="icon" />
              </div>
              <div className="contact-text">
                <p className="contact-label">LINKEDIN</p>
                <p className="contact-value">Kanigui Moise Silué</p>
              </div>
            </a>
          </div>
        </div>

        
      </div>
    </div>
  );
}