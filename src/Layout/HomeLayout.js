import React, { useEffect, useState } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

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
          <div className="page-view page-view-about">
            <About/>
          </div>
        );
      case 'Cv':
        return (
          <div className="page-view page-view-cv">
            <Cv/>
          </div>
        );
      case 'Projets':
        return (
          <div className="page-view page-view-projects">
            <Projets/>
          </div>
        );
      case 'Certificats':
        return (
          <div className="page-view page-view-certificats">
            <h1>Mes certificats</h1>
            <Certificats/>
          </div>
        );
      case 'Contact':
        return (
          <div className="page-view page-view-contact">
            <Contact/>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (scrollPosition / scrollableHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [activeSection]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

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
        <div className="scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` }} aria-hidden="true" />
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