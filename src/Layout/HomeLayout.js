import React, { useState } from 'react';
import { Menu, XIcon } from 'lucide-react';
import './HomeLayout.css';
import Sidebar from '../Components/Sidebar';
import About from '../Components/About';
import Cv from '../Components/Cv';
import Projets from '../Components/Projets';
import Certificats from '../Components/certificats';
import Contact from '../Components/Contact';

export default function HomeLayout() {
  const [activeSection, setActiveSection] = useState('About');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'About', label: 'À propos' },
    { id: 'Cv', label: 'CV' },
    { id: 'Projets', label: 'Projets' },
    { id: 'Certificats', label: 'Certificats' },
    { id: 'Contact', label: 'Contact' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'About':
        return (
          <div>
            <About/>
          </div>
        );
      case 'Cv':
        return (
          <div>
            <Cv/>
          </div>
        );
      case 'Projets':
        return (
          <div>
            <Projets/>
          </div>
        );
      case 'Certificats':
        return (
          <div>
            <h1>Mes certificats</h1>
            <Certificats/>
          </div>
        );
      case 'Contact':
        return (
          <div>
            <Contact/>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-layout">
      {/* Sidebar fixe à gauche */}
      <aside className="sidebar-section">
        <div className="sidebar-content-wrapper">
          {/* Votre composant Sidebar ici */}
          <Sidebar/>
        </div>
      </aside>

      {/* Contenu principal à droite */}
      <main className="main-content">
        {/* Navigation en haut */}
        <nav className="top-navigation">
          <div className="nav-wrapper">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-button ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Menu hamburger pour mobile */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-button ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Contenu dynamique */}
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}