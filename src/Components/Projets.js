import React from 'react';
import { Eye } from 'lucide-react';
import './Projets.css';
import moinschereci from '../assets/moinschereci.webp';
import gsf from '../assets/gsf.PNG';
import odholding from '../assets/odholding.PNG';
import formdev from '../assets/formationdev.webp';
import digitrobo from '../assets/digitrobo.webp';
import gestionstock from '../assets/gestionstock.PNG';
import sipci from '../assets/sip-ci.PNG';
import socialeglise from '../assets/socialeglise.webp';
import gestioneglise from '../assets/gestioneglise.webp';
import moneglisemobile from '../assets/moneglisemobile.png';
import restau from '../assets/restau.png';
import sosivoire from '../assets/sos ivoire.PNG';
import sosivoiremobile from '../assets/sos ivoire mobile.png';
import sipcimobile from '../assets/sipci-mobile.png';
import ticketmoto from '../assets/ticketmoto.PNG';
import gsfmobile from '../assets/gsf mobile.png';
import gestiongsf from '../assets/gestiongsf.PNG';
import def from '../assets/def.PNG';




export default function Projects() {
  const projects = [
    {
      id: 10,
      key: 'gestiongsf',
      image: gestiongsf,
      title: 'Application de gestion d\'établissement',
      description: 'Application web de gestion d\'établissement. gestion des inscription, scolarité, emploi du temps , bulletins, professeurs etc...',
      link: 'https://gestiongsf.com'
    },
    {
      id: 9,
      key: 'sip-ci',
      image: sipci,
      title: 'Site web Pour Entreprise immobilière',
      description: 'Site web pour entreprise immobilière avec plusieurs branches : services, galerie, blog, divers, immobilier etc...',
      link: 'https://sipci.org'
    },
    {
      id: 8,
      key: 'gsf',
      image: gsf,
      title: 'Application web Pour Établissement',
      description: 'Inscription dédiée aux étudiants, possibilité de publier des cours au format PDF, image ou vidéo, organisation précise par modules (Enseignement Supérieur, FDFP, filières spécialisées...), avec de nombreuses options pour enrichir et faciliter l’accès aux ressources pédagogiques.',
      link: 'https://groupesupformation.com'
    },
    {
      id: 7,
      key: 'moinschereci',
      image: moinschereci,
      title: 'Site E-commerce',
      description: 'Solution e-commerce clé en main combinant une marketplace publique (publier et vendre facilement), un module de paiement sécurisé intégré et un back-office administrateur avancé pour superviser commandes, paiements, statistiques et modération.',
      link: 'https://www.moinschere.great-site.net'
    },
    {
      id: 6,
      key: 'ticketmoto.com',
      image: ticketmoto,
      title: 'Application web pour gestion de stationnement de moto',
      description: 'Application web de gestion de stationnement de moto, chaque ticket est relié à la photo de la personne qui a le ticket. lorsque le ticket est remis et que la personne prend sa moto, le ticket redevient automatiquement disponible.',
      link: 'https://ticketmoto.gt.tc'
    },
    {
      id: 5,
      key: 'resto.com',
      image: restau,
      title: 'Site web + Application web de gestion de caisse pour restaurant, Lounge, maquis etc...',
      description: 'Application web avec gestion de caisse intégré, suivie de la caisse à distance et en temps réel.',
      link: 'https://restau.free.nf/'
    },
    {
      id: 4,
      key: 'formdev',
      image: formdev,
      title: 'Site web de formation',
      description: 'Un site web qui propose des formations complètes en développement web (frontend, backend, full-stack) et en design professionnel avec Figma, pensé pour accompagner chaque apprenant vers l’autonomie.',
      link: 'https://formation-dev.vercel.app'
    },
    {
      id: 3,
      key: 'gestionstock',
      image: gestionstock,
      title: 'Application Web de Gestion',
      description: 'Gestion Moins Chère est une application complète et intuitive conçue pour aider les entreprises, boutiques et commerces à gérer efficacement leurs activités au quotidien. Grâce à une interface moderne et simple d utilisation, elle regroupe tous les outils indispensables pour optimiser votre organisation, suivre vos ventes et maîtriser vos stocks en temps réel.',
      link: 'http://gestiontest.page.gd'
    },
    {
      id: 2,
      key: 'odholding',
      image: odholding,
      title: 'Site web Entreprise informatique',
      description: 'Solutions informatiques professionnelles dédiées à la digitalisation totale de vos projets, de la conception à la mise en production.',
      link: 'https://od-holding.vercel.app'
    },
    {
      id: 1,
      key: 'digitrobo',
      image: digitrobo,
      title: 'Site web pour entreprise électronique',
      description: 'Une boutique complète d’accessoires technologiques : caméras, drones, smartphones, casques virtuels, PC gamer, consoles et plusieurs autres équipements modernes.',
      link: 'https://digitrobo.vercel.app'
    }
  ];

  const renderProjectImage = (project) => {
    // Utiliser les images originales (plus simples et plus fiables)
    return (
      <img src={project.image} alt={project.title} loading="lazy" className="project-image" />
    );
  };

  const handleProjectClick = (project) => {
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };



   const projects2 = [
    {
      id: 18,
      key: 'DEF',
      image: def,
      title: 'DIEUESTFIDELE',
      description: 'Site vitrine pour entreprise d\'installation de GPS et Caméras de surveilance. site vitrine + backend robustre.(pas encore en ligne).',
    },
    {
      id: 17,
      key: 'sos ivoire mobile',
      image: sosivoiremobile,
      title: 'Saas mobile (en cours de developement)',
      description: 'Saas de sos pour chaque ville, synchronisé à la version web. Posibilité de poster des articels perdu ou volé, les coordonnées des dispensaires, commissariat, gendarmerie etc... sont disponible avec leurs numéros, localisation etc... (pas encore en ligne).',
    },
    {
      id: 16,
      key: 'sos ivoire',
      image: sosivoire,
      title: 'Saas web',
      description: 'Saas de sos pour chaque ville, posibilité de poster des articels perdu ou volé, les coordonnées des dispensaires, commissariat, gendarmerie etc... sont disponible avec leurs numéros, localisation etc... (pas encore en ligne).',
    },
    {
      id:15,
      key: 'sipci mobile',
      image: sipcimobile,
      title: 'Application mobile de sipci.org',
      description: 'Application mobile de sipci.org, c\'est la version mobile, elle est synchronisé à la version web. (pas encore en ligne sur appStore et playStore).',
    },
    {
      id: 14,
      key: 'Application mobile pour Établissement',
      image: gsfmobile,
      title: 'Application mobile pour Établissement',
      description: 'Application mobile de Groupe Sup\'Formation. Synchronisé à la version web. (pas encore en ligne sur appStore et playStore).',
    },
    {
      id: 13,
      key: 'moneglisemobile',
      image: moneglisemobile,
      title: 'Application mobile réseau social pour les églises (en vente) version mobile',
      description: 'Application mobile pour église, un réseau social qui vous permet de publier des informations, activité etc... imgae, texte, vidéo avec bien d autres fonctionnalité. l application est en vente donc si vous êtes intéresé veuillez me contacter. (pas encore en ligne sur appStore et playStore).',
      link: 'https://wa.me/p/26088646627413946/22557109835'
    },
    {
      id: 12,
      key: 'socialeglise',
      image: socialeglise,
      title: 'Application web réseau social pour les églises (en vente)',
      description: 'Application web pour église, un réseau social qui vous permet de publier des informations, activité etc... imgae, texte, vidéo avec bien d autres fonctionnalité. l application est en vente donc si vous êtes intéresé veuillez me contacter. (pas encore mis en ligne).',
      link: 'https://wa.me/p/26088646627413946/22557109835'
    },
    {
      id: 11,
      key: 'gestioneglise',
      image: gestioneglise,
      title: 'Application web de gestion pour les églises (en vente)',
      description: 'Application web de gestion d eglise. Cette application vous permet d avoir les données des fidèles de l église et bien d autres fonctionnalités.  (pas encore en ligne).',
      link: 'https://wa.me/p/26088646627413946/22557109835'
    },

  ];

  const renderProject2Image = (project2) => {
    return (
      <img src={project2.image} alt={project2.title} loading="lazy" className="project-image" />
    );
  };

  const handleProject2Click = (project2) => {
    if (project2.link) {
      window.open(project2.link, '_blank');
    }
  };

  return (
    <>
    <div className="projects-container">
      <div className="projects-content">
        <h1 className="projects-main-title">Tous mes Projets (18)</h1>
        <h2 className="projects-main-title2">Projets en ligne (10)</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div 
                onClick={() => handleProjectClick(project)}
                className="project-image-link"
                style={{ cursor: 'pointer' }}
              >
                <div className="project-image-wrapper">
                  {renderProjectImage(project)}
                  <div className="project-overlay">
                    <Eye className="project-eye-icon" />
                  </div>
                </div>
              </div>
              
              <div className="project-info">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="projects-container">
      <div className="projects-content">
        <h2 className="projects-main-title2">Mes Projets Non Déployé (8)</h2>
        <div className="projects-grid">
          {projects2.map((project2) => (
            <div key={project2.id} className="project-card">
              <div 
                onClick={() => handleProject2Click(project2)}
                className="project-image-link"
                style={{ cursor: 'pointer' }}
              >
                <div className="project-image-wrapper">
                  {renderProject2Image(project2)}
                  <div className="project-overlay">
                    <Eye className="project-eye-icon" />
                  </div>
                </div>
              </div>
              
              <div className="project-info">
                <h2 className="project-title">{project2.title}</h2>
                <p className="project-description">{project2.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


    </>
  );
}