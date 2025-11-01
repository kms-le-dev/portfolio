import React from 'react';
import './Experiences.css';

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      periode: "24 Janvier 2024 à nos jours",
      poste: "Consultant",
      entreprise: "WINLOGIC",
      taches: [
        "Former et assister au quotidien les agents de santé",
        "Recueillir les besoins fonctionnels locaux et les transmettre à sa hiérarchie",
        "Assurer la disponibilité du système (Application) au quotidien",
        "Réaliser le paramétrage de l'application",
        "Tester, identifier les dysfonctionnements éventuels du logiciel"
      ]
    },
    {
      id: 2,
      periode: "19 Octobre au 17 Novembre 2024",
      poste: "Opérateur Kit Biométrique (OKIT)",
      entreprise: "CEI",
      taches: []
    },
    {
      id: 3,
      periode: "2020 – 2024",
      poste: "Développeur Web",
      entreprise: "AFROTECHPLUS",
      taches: [
        "Création de site internet vitrine",
        "Création de site e-commerce",
        "Création et gestion de page Facebook Pro, Instagram et TikTok pour e-commerçants"
      ]
    },
    {
      id: 4,
      periode: "2018 – 2020",
      poste: "Gérant d'un cyber",
      entreprise: "Abobo Baoulé",
      taches: []
    },
    {
      id: 5,
      periode: "2016 – 2024",
      poste: "Répétiteur à temps partiel",
      entreprise: "",
      taches: [
        "Dispense des cours de CP1 à 1ère D"
      ]
    }
  ];

  return (
    <section className="experiences-section">
      <div className="experiences-container">
        <h2 className="experiences-title">
          Expériences Professionnelles
        </h2>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="experience-card">
                  <div className="experience-header">
                    <span className="experience-periode">{exp.periode}</span>
                    <h3 className="experience-poste">{exp.poste}</h3>
                    {exp.entreprise && (
                      <p className="experience-entreprise">{exp.entreprise}</p>
                    )}
                  </div>
                  
                  {exp.taches.length > 0 && (
                    <div className="experience-taches">
                      <h4>Tâches principales :</h4>
                      <ul>
                        {exp.taches.map((tache, idx) => (
                          <li key={idx}>{tache}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;