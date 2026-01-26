import React from 'react';
import { Eye } from 'lucide-react';
import './Projets.css';
import moinschereci from '../assets/moinschereci.PNG';
import gsf from '../assets/gsf.PNG';
import odholding from '../assets/odholding.PNG';
import formdev from '../assets/formationdev.PNG';
import digitrobo from '../assets/digitrobo.PNG';
import lesdocuments from '../assets/lesdocuments.PNG';
import fcferke from '../assets/fcferke.PNG';
import moinschere from '../assets/moinschere.PNG';
import ledev from '../assets/ledev.PNG';
import cafechoco from '../assets/cafechoco.PNG';
import gestionstock from '../assets/gestionstock.PNG';
import ecommerce from '../assets/ecommerce.PNG';
import sgiservices from '../assets/sgiservices.PNG';
import socialeglise from '../assets/socialeglise.PNG';
import gestioneglise from '../assets/gestioneglise.PNG';



export default function Projects() {
  const projects = [
    {
      id: 15,
      key: 'socialeglise',
      image: socialeglise,
      title: 'Mini réseau social pour les églises (en vente)',
      description: 'Application web pour église, un mini réseau social qui vous permet de publier des informations, activité etc... imgae, texte, vidéo avec bien d autres fonctionnalité. l application est en vente donc si vous êtes intéresé veuillez me contacter.',
    },
    {
      id: 14,
      key: 'gestioneglise',
      image: gestioneglise,
      title: 'Application web de gestion pour les églises (en vente)',
      description: 'Application web de gestion d eglise. Cette application vous permet d avoir les données des fidèles de l église et bien d autres fonctionnalités.',
    },
    {
      id: 13,
      key: 'sgiservices',
      image: sgiservices,
      title: 'Application web (en cours...)',
      description: 'Application web pour entreprise immobilière avec plusieurs branches : services, galerie, blog, divers, immobilier etc...',
      link: 'https://sgiservices.vercel.app'
    },
    {
      id: 12,
      key: 'ecommerce',
      image: ecommerce,
      title: 'Application de ecommerce',
      description: 'Application web de e-commerce pour la boutique en ligne moinschere. espace admin, panier etc...',
      link: 'http://moinschere.great-site.net'
    },
    {
      id: 11,
      key: 'gestionstock',
      image: gestionstock,
      title: 'Application de Gestion',
      description: 'Gestion Moins Chère est une application complète et intuitive conçue pour aider les entreprises, boutiques et commerces à gérer efficacement leurs activités au quotidien. Grâce à une interface moderne et simple d utilisation, elle regroupe tous les outils indispensables pour optimiser votre organisation, suivre vos ventes et maîtriser vos stocks en temps réel.',
      link: 'http://gestiontest.ct.ws'
    },
    {
      id: 10,
      key: 'moinschereci',
      image: moinschereci,
      title: 'Application E-commerce',
      description: 'Solution e-commerce clé en main combinant une marketplace publique (publier et vendre facilement), un module de paiement sécurisé intégré et un back-office administrateur avancé pour superviser commandes, paiements, statistiques et modération.',
      link: 'https://www.moinschere.ci'
    },
    {
      id: 9,
      key: 'gsf',
      image: gsf,
      title: 'Application web Pour Établissement',
      description: 'Inscription dédiée aux étudiants, possibilité de publier des cours au format PDF, image ou vidéo, organisation précise par modules (Enseignement Supérieur, FDFP, filières spécialisées...), avec de nombreuses options pour enrichir et faciliter l’accès aux ressources pédagogiques.',
      link: 'https://groupesupformation.com'
    },
    {
      id: 8,
      key: 'odholding',
      image: odholding,
      title: 'Site web Entreprise informatique',
      description: 'Solutions informatiques professionnelles dédiées à la digitalisation totale de vos projets, de la conception à la mise en production.',
      link: 'https://od-holding.vercel.app'
    },
    {
      id: 7,
      key: 'formdev',
      image: formdev,
      title: 'Site web de formation',
      description: 'Un site web qui propose des formations complètes en développement web (frontend, backend, full-stack) et en design professionnel avec Figma, pensé pour accompagner chaque apprenant vers l’autonomie.',
      link: 'https://formation-dev.vercel.app'
    },
    {
      id: 6,
      key: 'digitrobo',
      image: digitrobo,
      title: 'Site web pour entreprise électronique',
      description: 'Une boutique complète d’accessoires technologiques : caméras, drones, smartphones, casques virtuels, PC gamer, consoles et plusieurs autres équipements modernes.',
      link: 'https://digitrobo.vercel.app'
    },
    {
      id: 5,
      key: 'lesdocuments',
      image: lesdocuments,
      title: 'Application e-commerce',
      description: 'Vente en ligne de documents scolaires pour les élèves du CP1 au CM2, avec paiement sécurisé via la plateforme Chariow et réception automatique des fichiers PDF.',
      link: 'https://lesdocuments-ci.vercel.app'
    },
    {
      id: 4,
      key: 'fcferke',
      image: fcferke,
      title: 'Site vitrine',
      description: 'Plateforme dédiée à la mise en valeur d’un club de football, mettant en avant ses activités, ses séances d’entraînement, ses joueurs et ses projets, afin d’accroître sa présence et son impact digital.',
      link: 'https://fcferke.vercel.app'
    },
    {
      id: 3,
      key: 'moinschere',
      image: moinschere,
      title: 'Site internet',
      description: 'Présentation de l’entreprise e-commerce MoinsChere.ci, spécialisée dans la vente en ligne de divers produits, allant des appareils électroniques aux accessoires, en passant par l’électroménager et les articles du quotidien. La plateforme offre des prix compétitifs, un paiement sécurisé et une expérience d’achat facile pour tous les clients.',
      link: 'https://moinschere-ci.vercel.app'
    },
    {
      id: 2,
      key: 'ledev',
      image: ledev,
      title: 'site vitrine',
      description: 'Présentation détaillée de l’entreprise, de ses missions et de l’ensemble de ses prestations, conçues pour répondre efficacement aux attentes de ses clients.',
      link: 'https://le-dev-sigma.vercel.app'
    },
    {
      id: 1,
      key: 'cafechoco',
      image: cafechoco,
      title: 'Site web pour restaurant',
      description: 'Vente de cafés, chocolats chauds et autres boissons réconfortantes, préparées avec soin pour une expérience gustative unique.',
      link: 'https://cafechoco.vercel.app'
    }
  ];

  const renderProjectImage = (project) => {
    // Utiliser les images originales (plus simples et plus fiables)
    return (
      <img src={project.image} alt={project.title} loading="lazy" className="project-image" />
    );
  };

  const handleProjectClick = (project) => {
    if (project.id === 14 || project.id === 15) {
      alert('Projet en vente. Il n\'est pas encore en ligne si vous êtes intéressé écrivez moi dans contact.');
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div className="projects-container">
      <div className="projects-content">
        <h1 className="projects-main-title">Mes Projets</h1>
        
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
  );
}