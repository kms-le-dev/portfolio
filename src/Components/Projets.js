import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Projets.css';
import moinschereci from '../assets/optimized/moinschereci-webp.webp';
import gsf from '../assets/optimized/gsf-png.webp';
import odholding from '../assets/optimized/odholding-png.webp';
import formdev from '../assets/optimized/formationdev-webp.webp';
import digitrobo from '../assets/optimized/digitrobo-webp.webp';
import gestionstock from '../assets/optimized/gestionstock-png.webp';
import gestionphone from '../assets/optimized/gestioncaleli-png.webp';
import sipci from '../assets/optimized/sip-ci-png.webp';
import socialeglise from '../assets/optimized/socialeglise-webp.webp';
import gestioneglise from '../assets/optimized/gestioneglise-webp.webp';
import moneglisemobile from '../assets/optimized/moneglisemobile-png.webp';
import restau from '../assets/optimized/restau-png.webp';
import sosivoire from '../assets/optimized/sos ivoire-png.webp';
import sosivoiremobile from '../assets/optimized/sos ivoire mobile-png.webp';
import sipcimobile from '../assets/optimized/sipci-mobile-png.webp';
import ticketmoto from '../assets/optimized/ticketmoto-png.webp';
import gsfmobile from '../assets/optimized/gsf mobile-png.webp';
import gestiongsf from '../assets/optimized/gestiongsf-png.webp';
import docgratuit from '../assets/optimized/docgratuit-png.webp';
import def from '../assets/optimized/def-png.webp';
import ori from '../assets/optimized/oriacademie-png.webp';
import dymsensuelle from '../assets/optimized/dymsensuelle-png.webp';
import btp from '../assets/optimized/btp-png.webp';
import aser from '../assets/optimized/aser-png.webp';
import ferke from '../assets/optimized/ferke-png.webp';
import gsegliseVideo from '../assets/optimized/videos/gseglise.mp4';
import aebeciMobileVideo from '../assets/optimized/videos/aebeci-mobile.mp4';
import aebeciWebVideo from '../assets/optimized/videos/aebeci-web.mp4';
import gsfMobileVideo from '../assets/optimized/videos/gsf-mobile.mp4';
import sipciMobileVideo from '../assets/optimized/videos/sipci-mobile.mp4';
import saasSosVideo from '../assets/optimized/videos/saas-sos.mp4';
import gsfGestionVideo from '../assets/optimized/videos/gsf-gestion.mp4';
import ferkeVideo from '../assets/optimized/videos/ferke.mp4';




export default function Projects({ showAll = false }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoError, setVideoError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const videoRef = useRef(null);

  const playMutedVideo = useCallback((video) => {
    video.muted = true;
    video.volume = 0;
    video.play().catch((error) => {
      if (error.name !== 'AbortError') {
        setVideoError('La lecture de cette vidéo a échoué. Veuillez réessayer.');
      }
    });
  }, []);

  useEffect(() => {
    if (!activeVideo || !videoRef.current) return undefined;

    const video = videoRef.current;
    playMutedVideo(video);
    return () => video.pause();
  }, [activeVideo, playMutedVideo]);

  useEffect(() => {
    if (!activeVideo) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveVideo(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeVideo]);

  const projects = [
    {
      id: 18,
      key: 'FERKE.COM',
      image: ferke,
      video: ferkeVideo,
      title: 'FERKE.COM',
      description: 'PWA de services d’urgence pour Ferké : retrouver les structures utiles, leurs coordonnées et leur localisation.',
      technologies: ['React.js', 'CSS', 'Laravel', 'MySQL', 'API REST']
    },
    {
      id: 17,
      key: 'ASER',
      image: aser,
      title: 'ASER COSMÉTIQUE',
      description: 'Site vitrine présentant les produits et l’activité d’une entreprise de cosmétiques.',
      link: 'https://aser-omega.vercel.app/',
      technologies: ['React.js', 'CSS']
    },
    {
      id: 16,
      key: 'AIG BTP',
      image: btp,
      title: 'AIG BTP',
      description: 'Site vitrine pour une entreprise de BTP, avec présentation de ses activités et de ses prestations.',
      link: 'https://btptest.vercel.app',
      technologies: ['React.js', 'CSS']
    },
    {
      id: 15,
      key: 'ORI ACADEMIE',
      image: ori,
      title: 'ORI ACADÉMIE',
      description: 'Plateforme de cours à domicile permettant aux parents de demander un répétiteur et aux répétiteurs de proposer leur candidature.',
      link: 'https://oriacademie.com',
      technologies: ['React.js', 'CSS', 'Firebase']
    },
    {
      id: 14,
      key: 'DEF Securité',
      image: def,
      title: 'DEF SECURITÉ PLUS',
      description: 'Site vitrine et espace de gestion pour une entreprise spécialisée dans l’installation de GPS et de caméras de surveillance.',
      link: 'https://defsecuriteplus.com',
      technologies: ['React.js', 'CSS', 'Laravel', 'MySQL', 'API REST']
    },
    {
      id: 13,
      key: 'Dym sensuelle',
      image: dymsensuelle,
      title: 'D\'YM Sensuelle',
      description: 'Boutique en ligne d’articles de lingerie et d’accessoires, conçue pour être installable sur mobile, tablette et ordinateur.',
      link: 'https://dymsensuelle.ct.ws/',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 12,
      key: 'gestion telephone',
      image: gestionphone,
      title: 'Gestion Phone',
      description: 'Application de gestion de stock destinée à une activité de vente et de réparation de téléphones, utilisable sur plusieurs formats d’écran.',
      link: 'https://gestionphone.gt.tc',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 11,
      key: 'Docgratuit',
      image: docgratuit,
      title: 'DocGratuit.com',
      description: 'Plateforme de publication et de téléchargement de ressources pédagogiques : cours, exercices, devoirs et examens.',
      link: 'https://docgratuit.vercel.app',
      technologies: ['React.js', 'CSS', 'Laravel', 'MySQL', 'API REST']
    },
    {
      id: 10,
      key: 'gestiongsf',
      image: gestiongsf,
      video: gsfGestionVideo,
      title: 'Application de gestion d\'établissement',
      description: 'Application de gestion d’établissement couvrant notamment les inscriptions, la scolarité et les emplois du temps. L’interface est protégée.',
      technologies: ['React.js', 'CSS', 'Laravel', 'MySQL', 'API REST']
    },
    {
      id: 9,
      key: 'sip-ci',
      image: sipci,
      title: 'Site web pour entreprise immobilière',
      description: 'Site web regroupant les services, la galerie, le blog et les annonces d’une entreprise immobilière.',
      link: 'https://sipci.org',
      technologies: ['React.js', 'CSS', 'Laravel', 'MySQL', 'API REST']
    },
    {
      id: 8,
      key: 'gsf',
      image: gsf,
      title: 'Application web pour établissement',
      description: 'Espace destiné aux étudiants pour gérer les inscriptions et accéder aux supports de cours au format PDF.',
      link: 'https://groupesupformation.com',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 7,
      key: 'moinschereci',
      image: moinschereci,
      title: 'Site e-commerce',
      description: 'Marketplace avec publication d’articles, parcours d’achat et espace d’administration pour le suivi des commandes.',
      link: 'https://moinschere.gt.tc',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 6,
      key: 'ticketmoto.com',
      image: ticketmoto,
      title: 'Gestion de stationnement de motos',
      description: 'Application de suivi des tickets de stationnement, associés à la photo du détenteur et remis à disposition après le départ de la moto.',
      link: 'https://ticketmoto.gt.tc',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 5,
      key: 'resto.com',
      image: restau,
      title: 'Site et gestion de caisse pour restaurant',
      description: 'Application web de caisse avec suivi à distance de l’activité du restaurant.',
      link: 'https://restau.free.nf/',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 4,
      key: 'formdev',
      image: formdev,
      title: 'Site de formation au développement',
      description: 'Site présentant des formations en développement web — frontend, backend et fullstack — ainsi qu’en design avec Figma.',
      link: 'https://formation-dev.vercel.app',
      technologies: ['HTML', 'CSS', 'Bootstrap']
    },
    {
      id: 3,
      key: 'gestionstock',
      image: gestionstock,
      title: 'Gestion Moins Chère',
      description: 'Application de gestion destinée aux entreprises, boutiques et commerces, avec une interface web pour le suivi de leurs activités.',
      link: 'https://gestiontest.page.gd',
      technologies: ['PHP', 'CSS', 'MySQL']
    },
    {
      id: 2,
      key: 'odholding',
      image: odholding,
      title: 'Site web d’entreprise informatique',
      description: 'Site vitrine présentant les services et l’accompagnement informatique de l’entreprise.',
      link: 'https://od-holding.vercel.app',
      technologies: ['React.js', 'CSS']
    },
    {
      id: 1,
      key: 'digitrobo',
      image: digitrobo,
      title: 'Site web pour entreprise électronique',
      description: 'Boutique en ligne présentant des équipements et accessoires technologiques, dont des caméras, drones, smartphones et ordinateurs.',
      link: 'https://digitrobo.vercel.app',
      technologies: ['HTML', 'CSS', 'Bootstrap']
    }
  ];

  const renderProjectTechnologies = (project) => {
    if (!project.technologies?.length) return null;

    return (
      <ul className="project-technologies" aria-label="Technologies utilisées">
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    );
  };

  const handleProjectClick = (project) => {
    if (project.video) {
      setVideoError('');
      setActiveVideo({ src: project.video, title: project.title, poster: project.image });
      return;
    }

    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };



   const projects2 = [
    
    
    {
      id: 7,
      key: 'sos ivoire mobile',
      image: sosivoiremobile,
      title: 'Plateforme SOS — mobile',
      description: 'Version mobile du service SOS, synchronisée avec le web, pour signaler des objets perdus ou volés et retrouver les services publics locaux. Non publiée sur les stores.',
      technologies: ['React Native / Expo', 'Laravel', 'API REST', 'MySQL']
    },
    {
      id: 6,
      key: 'sos ivoire',
      image: sosivoire,
      video: saasSosVideo,
      title: 'Plateforme SOS ivoirienne',
      description: 'Service web de signalement d’objets perdus ou volés et de consultation des coordonnées et localisations des services publics. Pas encore en ligne.',
      technologies: ['React.js', 'CSS', 'Laravel', 'API REST', 'MySQL']
    },
    {
      id:5,
      key: 'sipci mobile',
      image: sipcimobile,
      video: sipciMobileVideo,
      title: 'Application mobile de sipci.org',
      description: 'Application mobile associée au site SIPCI et synchronisée avec sa version web. Pas encore publiée sur l’App Store ou Google Play.',
      technologies: ['React Native / Expo', 'Laravel', 'API REST', 'MySQL']
    },
    {
      id: 4,
      key: 'Application mobile pour Établissement',
      image: gsfmobile,
      video: gsfMobileVideo,
      title: 'Application mobile pour Établissement',
      description: 'Application mobile de Groupe Sup’Formation synchronisée avec la plateforme web. Pas encore publiée sur l’App Store ou Google Play.',
      technologies: ['React Native / Expo', 'Laravel', 'API REST', 'MySQL']
    },
    {
      id: 3,
      key: 'moneglisemobile',
      image: moneglisemobile,
      video: aebeciMobileVideo,
      title: 'Réseau social pour églises — mobile',
      description: 'Application mobile permettant aux églises de publier des actualités et des activités sous forme de texte, d’image ou de vidéo. Projet disponible à la vente, non publié sur les stores.',
      technologies: ['React Native / Expo', 'Laravel', 'API REST', 'MySQL']
    },
    {
      id: 2,
      key: 'socialeglise',
      image: socialeglise,
      video: aebeciWebVideo,
      title: 'Réseau social pour églises — web',
      description: 'Application web permettant aux églises de partager des actualités et des activités sous forme de texte, d’image ou de vidéo. Projet disponible à la vente, non publié.',
      technologies: ['React.js', 'Laravel', 'API REST', 'MySQL']
    },
    {
      id: 1,
      key: 'gestioneglise',
      image: gestioneglise,
      video: gsegliseVideo,
      title: 'Gestion d’église — application web',
      description: 'Application de gestion des informations des fidèles et des activités d’une église. Projet disponible à la vente, non publié.',
      technologies: ['React.js', 'CSS', 'Laravel', 'API REST', 'MySQL']
    },

  ];

  const allProjects = [...projects, ...projects2];
  const projectFilters = [
    { id: 'all', label: 'Tous' },
    { id: 'web', label: 'Web & métier' },
    { id: 'mobile', label: 'Mobile' },
  ];
  const filteredProjects = allProjects.filter((project) => {
    const isMobile = project.technologies.includes('React Native / Expo');
    return activeFilter === 'all' || (activeFilter === 'mobile' ? isMobile : !isMobile);
  });
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <>
    <div className="projects-container">
      <div className="projects-content">
        <h2 className="projects-main-title">Tous mes projets (25)</h2>
        <div className="project-filters" role="group" aria-label="Filtrer les projets">
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`project-filter${activeFilter === filter.id ? ' is-active' : ''}`}
              aria-pressed={activeFilter === filter.id}
              aria-controls="projects-grid"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="project-results-count" role="status" aria-live="polite">
          {showAll
            ? `${filteredProjects.length} ${filteredProjects.length === 1 ? 'projet' : 'projets'}`
            : `${visibleProjects.length} ${visibleProjects.length === 1 ? 'projet affiché' : 'projets affichés'}`}
        </p>
        <div className="projects-grid" id="projects-grid">
          {visibleProjects.map((project) => (
            <div key={`${project.key}-${project.id}`} className="project-card">
              <button
                type="button"
                onClick={() => handleProjectClick(project)}
                className="project-image-link"
                aria-label={project.video ? `Lire la vidéo du projet ${project.title}` : `Visiter le site ${project.title}`}
              >
                <span className="project-image-wrapper">
                  <img src={project.image} alt="" loading="lazy" decoding="async" className="project-image" />
                  <span className="project-overlay">
                    <Eye className="project-eye-icon" />
                  </span>
                </span>
              </button>
              
              <div className="project-info">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                {renderProjectTechnologies(project)}
              </div>
            </div>
          ))}
        </div>
        {!showAll && (
          <div className="all-projects-action">
            <Link className="all-projects-button" to="/projets">
              Voir tous les projets
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>

    {activeVideo && (
      createPortal(
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Vidéo du projet ${activeVideo.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Fermer la vidéo"
            >
              <X aria-hidden="true" />
            </button>
            <video
              ref={videoRef}
              className="project-video"
              src={activeVideo.src}
              poster={activeVideo.poster}
              autoPlay
              muted
              playsInline
              controls
              preload="auto"
              onCanPlay={(event) => {
                const video = event.currentTarget;

                if (video.paused) {
                  playMutedVideo(video);
                }
              }}
              onVolumeChange={(event) => {
                if (!event.currentTarget.muted || event.currentTarget.volume !== 0) {
                  event.currentTarget.muted = true;
                  event.currentTarget.volume = 0;
                }
              }}
              onError={() => setVideoError('Impossible de charger cette vidéo. Veuillez réessayer.')}
            />
            {videoError && <p className="video-error" role="alert">{videoError}</p>}
          </div>
        </div>,
        document.body
      )
    )}
    </>
  );
}