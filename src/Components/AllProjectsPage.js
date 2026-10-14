import React, { useEffect } from 'react';
import { ArrowLeft, BriefcaseBusiness, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Projects from './Projets';
import { PortfolioFooter } from '../Layout/HomeLayout';
import ScrollDirectionButton from './ScrollDirectionButton';
import projectPreview from '../assets/profil dev.png';
import './AllProjectsPage.css';

export default function AllProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-projects-shell background-section background-section--two">
      <main className="all-projects-page">
        <Link className="all-projects-home-link" to="/#home">
          <ArrowLeft size={17} aria-hidden="true" />
          Retour à l’accueil
        </Link>
        <header className="all-projects-page__header">
          <div className="all-projects-hero">
            <p className="kicker">Portfolio · Sélection de réalisations</p>
            <h1>Des projets conçus pour des usages réels.</h1>
            <img
              className="all-projects-preview"
              src={projectPreview}
              alt="Aperçu de la PWA FERKE.COM"
              loading="eager"
            />
            <p className="all-projects-description">
              Sites web, outils métier et applications mobiles : explorez les réalisations et leurs technologies.
            </p>
            <div className="all-projects-highlights" aria-label="Catégories de projets">
              <span><BriefcaseBusiness size={17} aria-hidden="true" /> Web & métier</span>
              <span><Code2 size={17} aria-hidden="true" /> Applications mobiles</span>
            </div>
          </div>
        </header>
        <section className="all-projects-page__content" aria-label="Tous les projets">
          <Projects showAll />
        </section>
      </main>
      <PortfolioFooter />
      <ScrollDirectionButton />
    </div>
  );
}
