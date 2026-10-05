import React from 'react';
import { GraduationCap, Briefcase, Download } from 'lucide-react';
import './Cv.css';
import cvPDF from '../assets/CV KANIGUI MOISE SILUÉ.pdf';
import cssLogo from '../assets/optimized/technologies/css.webp';
import djangoLogo from '../assets/optimized/technologies/Django.webp';
import expoLogo from '../assets/optimized/technologies/expo react native.webp';
import figmaLogo from '../assets/optimized/technologies/Figma.webp';
import firebaseLogo from '../assets/optimized/technologies/firebase.webp';
import gitHubLogo from '../assets/optimized/technologies/git github.webp';
import herozionLogo from '../assets/optimized/technologies/herozion.webp';
import htmlLogo from '../assets/optimized/technologies/html.webp';
import javascriptLogo from '../assets/optimized/technologies/JavaScript.webp';
import laravelLogo from '../assets/optimized/technologies/laravel.webp';
import mysqlLogo from '../assets/optimized/technologies/mysql.webp';
import phpLogo from '../assets/optimized/technologies/php.webp';
import postgresqlLogo from '../assets/optimized/technologies/postgresql.webp';
import pythonLogo from '../assets/optimized/technologies/python.webp';
import reactLogo from '../assets/optimized/technologies/react js.webp';
import sqlLogo from '../assets/optimized/technologies/sql.webp';
import tailwindLogo from '../assets/optimized/technologies/Tilwind CSS.webp';

const technologies = [
  { name: 'HTML5', image: htmlLogo },
  { name: 'CSS3', image: cssLogo },
  { name: 'JavaScript', image: javascriptLogo },
  { name: 'React.js', image: reactLogo },
  { name: 'React Native / Expo', image: expoLogo },
  { name: 'PHP', image: phpLogo },
  { name: 'Laravel', image: laravelLogo },
  { name: 'Python', image: pythonLogo },
  { name: 'Django', image: djangoLogo },
  { name: 'MySQL', image: mysqlLogo },
  { name: 'PostgreSQL', image: postgresqlLogo },
  { name: 'SQL', image: sqlLogo },
  { name: 'Firebase', image: firebaseLogo },
  { name: 'Git & GitHub', image: gitHubLogo },
  { name: 'Tailwind CSS', image: tailwindLogo },
  { name: 'Figma', image: figmaLogo },
  { name: 'Herozion', image: herozionLogo },
];

export default function CV() {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvPDF;
    link.download = 'CV KANIGUI MOISE SILUÉ.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cv-container">
      <div className="cv-content">
        <h1 className="cv-main-title">Curriculum Vitae</h1>

        {/* Section Diplômes et Formations */}
        <section className="cv-section technologies-section">
          <div className="section-header">
            <div className="section-icon-box">
              <GraduationCap className="section-icon" />
            </div>
            <h2 className="cv-section-title">Diplômes et Formations</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-period">2026</div> 
              <div className="timeline-content">
                <h3 className="timeline-title">Master 2 Génie Logiciel</h3> 
                <p className="timeline-location">IBSFA (Groupe Sup'Formation ABIDJAN/PLATEAU-DOKUI)</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-period">2025 - 2026</div> 
              <div className="timeline-content">
                <h3 className="timeline-title">Master 1 Génie Logiciel</h3> 
                <p className="timeline-location">IBSFA (Groupe Sup'Formation ABIDJAN/PLATEAU-DOKUI)</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-period">2024 - 2025</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Licence 3 Génie Logiciel</h3>
                <p className="timeline-location">IBSFA (Groupe Sup'Formation ABIDJAN/PLATEAU-DOKUI)</p>
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

            <div className="timeline-item">
              <div className="timeline-period">10 Octobre 2025 au 18 Juillet 2026</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Enseignant : BTS et Licence</h3>
                <p className="timeline-subtitle">Matières :</p>
                <ul className="timeline-tasks">
                  <li>Mathématique Générales.</li>
                  <li>Dévéloppement Web (HTML, CSS, JavaScript, PHP).</li>
                  <li>Dévéloppement Mobile (React Native- Expo).</li>
                </ul>
              </div>
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
              <div className="timeline-period">2024 à Nos jours</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Développeur Web / Mobile Fullstack Freelance</h3>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-period">2020 – 2024</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Développeur Fullstack à AFROTECHPLUS</h3>
                <ul className="timeline-tasks">
                  <li>Création de site internet vitrine</li>
                  <li>Création de site e-commerce</li>
                  <li>Création d'application de gestion</li>
                  <li>Etc...</li>
                </ul>
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

        {/* Section Technologie */}
        <section className="cv-section">
          <div className="section-header">
            <div className="section-icon-box">
              <Briefcase className="section-icon" />
            </div>
            <h2 className="cv-section-title">Technologies</h2>
          </div>

          <div className="technology-grid">
            {technologies.map((technology, index) => (
              <div
                key={technology.name}
                className="technology-card"
                style={{ '--technology-delay': `${index * 55}ms` }}
              >
                <div className="technology-logo-wrap">
                  <img className="technology-logo" src={technology.image} alt="" loading="lazy" />
                </div>
                <h3 className="technology-name">{technology.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="download-button-container">
        <button className="download-button" onClick={handleDownloadCV}>
          <Download size={20} />
          Télécharger CV
        </button>
      </div>
    </div>
  );
}