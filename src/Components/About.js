import React from 'react';
import { Palette, Code, Smartphone } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* Section À Propos */}
        <section className="about-section">
          <h1 className="section-title">À Propos</h1>
          <p className="about-text">
            Je suis un développeur Fullstack passionné, spécialisé dans la création d'applications modernes,
            performantes et adaptées aux besoins de chaque client. Je suis spécialisé dans la conception et le développement d'applications sur mesure.
            Mon objectif est de transformer les besoins des entreprises en solutions informatiques performantes et stratégiques, contribuant ainsi à leur croissance et à leur succès.
            Toujours en quête de perfectionnement, je mets mes compétences techniques et ma créativité au service de projets ambitieux et novateurs.
          </p>
        </section>

        {/* Section Compétences */}
        <section className="skills-section">
          <h2 className="section-title">Compétences Générales</h2>
          
          <div className="skills-grid">
            {/* Web Design */}
            <div className="skill-card">
              <div className="skill-icon-box">
                <Palette className="skill-icon" />
              </div>
              <h3 className="skill-title">Web Design</h3>
              <p className="skill-description">
                Je conçois des designs modernes avec Figma, permettant une bonne expérience utilisateur, maquette, prototipage, affiche, logo etc... pour une bonne qualité visuelle.
              </p>
            </div>

            {/* Développement Web */}
            <div className="skill-card">
              <div className="skill-icon-box">
                <Code className="skill-icon" />
              </div>
              <h3 className="skill-title">Développement Web</h3>
              <p className="skill-description">
                Spécialisé en développement fullstack, j'utilise HTML, CSS, JS, React, PHP, Laravel, 
                Django et Docker pour créer des sites et applications
                web rapides, sécurisés, évolutifs et adaptés aux besoins du client.
              </p>
            </div>

            {/* Développement Mobile */}
            <div className="skill-card">
              <div className="skill-icon-box">
                <Smartphone className="skill-icon" />
              </div>
              <h3 className="skill-title">Développement Mobile</h3>
              <p className="skill-description">
                Avec React Native et flutter, je développe des applications mobile performantes
                et multiplateformes (iOS et Android) adaptées aux besoins du client. Que soit 
                des Applications mobile statique ou dynamique.
              </p>
            </div>

            {/* Intelligence Artificielle */}
            <div className="skill-card">
              <div className="skill-icon-box">
                <Smartphone className="skill-icon" />
              </div>
              <h3 className="skill-title">Intélligence Artificielle</h3>
              <p className="skill-description">
                J’utilise les outils d’intelligence artificielle pour
                optimiser mon processus de développement,
                accélérer la résolution de problèmes et améliorer la
                qualité des solutions que je produis.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}