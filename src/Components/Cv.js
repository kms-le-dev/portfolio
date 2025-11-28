import React from 'react';
import { GraduationCap, Briefcase, Download } from 'lucide-react';
import './Cv.css';
import cvPdf from '../assets/CV_KANIGUI_MOISE_SILUE.pdf';

export default function CV() {
  return (
    <div className="cv-container">
      <div className="cv-content">
        <h1 className="cv-main-title">Curriculum Vitae</h1>

        {/* Section Diplômes et Formations */}
        <section className="cv-section">
          <div className="section-header">
            <div className="section-icon-box">
              <GraduationCap className="section-icon" />
            </div>
            <h2 className="cv-section-title">Diplômes et Formations</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-period">2024 - 2025</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Licence 3 Génie Logiciel</h3>
                <p className="timeline-location">Groupe Sup' formation ABIDJAN/PLATEAU-DOKUI</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2020 - 2021</div>
              <div className="timeline-content">
                <h3 className="timeline-title">2ème année IDA</h3>
                <p className="timeline-subtitle">(Informatique Développeur d'Application)</p>
                <p className="timeline-location">ETEP PLATEAU ABIDJAN/EP0335</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2019 - 2020</div>
              <div className="timeline-content">
                <h3 className="timeline-title">1ère année IDA</h3>
                <p className="timeline-subtitle">(Informatique Développeur d'Application)</p>
                <p className="timeline-location">ETEP PLATEAU ABIDJAN/EP0335</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2018 - 2019</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Licence 2 Mathématique Informatique</h3>
                <p className="timeline-location">Université Nangui Abrogoua</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2017 - 2018</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Licence 1 Mathématique Informatique</h3>
                <p className="timeline-location">Université Nangui Abrogoua</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2015 - 2016</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Obtention du Bac D</h3>
                <p className="timeline-location">Collège Rosée Divine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Expériences */}
        <section className="cv-section">
          <div className="section-header">
            <div className="section-icon-box">
              <Briefcase className="section-icon" />
            </div>
            <h2 className="cv-section-title">Expériences</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-period">24 Janvier 2024 à nos jours</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Consultant à WINLOGIC</h3>
                <p className="timeline-subtitle">Tâches :</p>
                <ul className="timeline-tasks">
                  <li>Former et assister au quotidien les agents de santé</li>
                  <li>Recueillir les besoins fonctionnels locaux et les transmettre à sa hiérarchie</li>
                  <li>Assurer la disponibilité du système (Application) au quotidien</li>
                  <li>Réaliser le paramétrage de l'application</li>
                  <li>Tester, identifier les dysfonctionnements éventuels du logiciel</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">19 Octobre au 17 Novembre 2024</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Opérateur Kit Biométrique (OKIT) pour la CEI</h3>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2020 – 2024</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Développeur Web à AFROTECHPLUS</h3>
                <ul className="timeline-tasks">
                  <li>Création de site internet vitrine</li>
                  <li>Création de site e-commerce</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2022 à Nos jours</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Développeur Fullstack Freelance à temps partiel</h3>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2018 – 2020</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Gérant d'un cyber à Abobo Baoulé</h3>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2016 – 2024</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Répétiteur à temps partiel</h3>
                <ul className="timeline-tasks">
                  <li>Dispense des cours de CP1 à 1ère D</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bouton Télécharger CV */}
      <div className="cv-download-section">
        <a 
          href={cvPdf} 
          download="CV_KANIGUI_MOISE_SILUE.pdf"
          className="cv-download-btn"
        >
          <Download size={20} />
          <span>Télécharger CV</span>
        </a>
      </div>
    </div>
  );
}