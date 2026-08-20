import React, { useEffect, useRef, useState } from 'react';
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
  const contentAreaRef = useRef(null);

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
    const contentArea = contentAreaRef.current;
    if (!contentArea) return undefined;

    const elements = contentArea.querySelectorAll(
      '.page-view, .page-view section, .page-view article, .page-view form, .page-view .skill-card, .page-view .project-card, .page-view .timeline-item, .page-view .certificats-card, .page-view .contact-link'
    );

    elements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min(index * 55, 330)}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: contentArea, threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeSection]);

  useEffect(() => {
    const contentArea = contentAreaRef.current;
    if (!contentArea) return undefined;

    const updateProgress = () => {
      const scrollableHeight = contentArea.scrollHeight - contentArea.clientHeight;
      const progress = scrollableHeight > 0 ? (contentArea.scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    updateProgress();
    contentArea.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      contentArea.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
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
        <div className="content-area" ref={contentAreaRef}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}