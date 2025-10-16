
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Github, ExternalLink, MessageCircle, Facebook, Music, Mail, ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize2, X } from "lucide-react";
// import de la vidéo depuis le dossier assets
import demoVideo from "./assets/gsf.mp4";
import projet4Img from "./assets/gsf.jpg";


function Projet1() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGithubPopup, setShowGithubPopup] = useState(false);


  // Remplacez la section "Animation Three.js pour le background" dans votre useEffect par ce code :

useEffect(() => {
  if (!backgroundRef.current) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  backgroundRef.current.appendChild(renderer.domElement);

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", handleResize);

}, []);


    // play / pause
  const toggleVideo = (e) => {
    e?.preventDefault();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      // try play (autoplay may be blocked if not user-initiated)
      v.play().catch(err => {
        // playback blocked, inform user (console/log)
        console.warn("Playback blocked:", err);
      });
      setIsVideoPlaying(true);
    } else {
      v.pause();
      setIsVideoPlaying(false);
    }
  };

  // mute/unmute
  const toggleMute = (e) => {
    e?.preventDefault();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  // fullscreen
  const toggleFullscreen = async (e) => {
    e?.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.warn("Fullscreen request failed:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };


  // quitter fullscreen si user sort (ex: ESC)
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // arrêt de la vidéo au démontage
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (e) { /* ignore */ }
      }
    };
  }, []);


  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      onClick: () => setShowGithubPopup(true),
      color: '#333',
      hoverColor: '#000'
    },
    
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      url: 'https://wa.me/message/X6EHY2YLVRB2O1',
      color: '#333',
      hoverColor: '#000'
    },
    
    {
      name: 'TikTok',
      icon: <Music size={24} />,
      url: 'https://www.tiktok.com/@kms.le.dev?_t=ZP-8zycfbSGy5P&_r=1',
      color: '#333',
      hoverColor: '#000'
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      url: 'mailto:kanigui43@gmail.com',
      color: '#333',
      hoverColor: '#000'
    }
  ];

  return (
    <div className="projet-container">
      {/* Background animé */}
      <div className="background-animation" ref={backgroundRef}></div>

      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <button className="back-btn" onClick={() => window.history.back()}>
              <ArrowLeft size={20} />
              Retour
            </button>
          </div>
          
          <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
          ☰
          </button>

          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <li><button onClick={() => scrollToSection('projet-hero')}>Aperçu</button></li>
            <li><button onClick={() => scrollToSection('projet-details')}>Détails</button></li>
            <li><button onClick={() => scrollToSection('projet-tech')}>Technologies</button></li>
            <li><button onClick={() => scrollToSection('projet-social')}>Partager</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="projet-hero" className="projet-hero">
        <div className="hero-content">
          <div className="projet-badge">
            <span>Projet Full Stack</span>
          </div>
          <h1 className="projet-title">Application web d'etablissement supérieur</h1>
          <p className="projet-description">
            Une application web moderne développée avec HTML, CSS, PHP, MYSQL. 
            Interface utilisateur intuitive, paiements sécurisés, possibilité de poster des affiches par l'admin, telecharger les formulaires rempli par les utilisateurs sous forme de pdf, etc...
          </p>
          
          {/* Video Demo */}
          <div className="video-container" ref={containerRef}>
            <video
              ref={videoRef}
              className="demo-video"
              poster={projet4Img}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src={demoVideo} type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo HTML5.
            </video>
            
            <div className="video-controls">
              <button className="control-btn play-btn" onClick={toggleVideo}>
                {isVideoPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button className="control-btn" onClick={toggleMute}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <button className="control-btn" onClick={toggleFullscreen}>
                <Maximize2 size={20} />
              </button>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Détails du Projet */}
      <section id="projet-details" className="projet-details">
        <div className="details-container">
          <div className="details-grid">
            <div className="detail-card">
              <div className="card-icon">🎯</div>
              <h3>Objectif</h3>
              <p>Créer une plateforme web complète avec une expérience utilisateur exceptionnelle et des performances optimales.</p>
            </div>
            
            <div className="detail-card">
              <div className="card-icon">⚡</div>
              <h3>Fonctionnalités</h3>
              <p>espace utilisateur, admin, mode de paiement securisé, stockage des informations dans l'espace admin.</p>
            </div>
            
            <div className="detail-card">
              <div className="card-icon">🚀</div>
              <h3>Performance</h3>
              <p>Temps de chargement &lt; 4s, responsive design, optimisation SEO et architecture scalable.</p>
            </div>
          </div>
          
          <div className="project-stats">
            <div className="stat">
              <div className="stat-number">1</div>
              <div className="stat-label">Mois de développement</div>
            </div>
            <div className="stat">
              <div className="stat-number">10+</div>
              <div className="stat-label">Fonctionnalités</div>
            </div>
            <div className="stat">
              <div className="stat-number">80%</div>
              <div className="stat-label">Score Performance</div>
            </div>
            <div className="stat">
              <div className="stat-number">240+</div>
              <div className="stat-label">Utilisateurs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section id="projet-tech" className="projet-tech">
        <div className="tech-container">
          <h2>Stack Technique</h2>
          <div className="tech-grid">
            
            <div className="tech-category">
              <h3>UI/UX Design</h3>
              <div className="tech-items">
                <span className="tech-item react">Figma</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-items">
                <span className="tech-item react">Html</span>
                <span className="tech-item">Css</span>
                <span className="tech-item">Js</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h3>Backend</h3>
              <div className="tech-items">
                <span className="tech-item">Php</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h3>DevOps</h3>
              <div className="tech-items">
                <span className="tech-item">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section id="projet-social" className="projet-social">
        <div className="social-container">
          <h2>Partagez & Explorez</h2>
          <p>Découvrez le projet sur différentes plateformes</p>
          
          <div className="social-grid">
          {socialLinks.map((social) => (
            social.url ? (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{"--social-color": social.color, "--social-hover": social.hoverColor}}
              >
                <div className="social-icon">{social.icon}</div>
                <span className="social-name">{social.name}</span>
                <div className="social-bg"></div>
              </a>
            ) : (
              <button
                key={social.name}
                onClick={social.onClick}
                className="social-link"
                style={{"--social-color": social.color, "--social-hover": social.hoverColor}}
              >
                <div className="social-icon">{social.icon}</div>
                <span className="social-name">{social.name}</span>
                <div className="social-bg"></div>
              </button>
            )
          ))}
        </div>

        <div className="cta-section"> 
          <button className="cta-button secondary" onClick={() => window.open("https://gsformation.ct.ws/groupe-sup-formation/supformation/public/index.php", "_blank")}>
          <span>Tester la Demo</span> 
          <div className="cta-bg"></div> 
          </button> 
        </div>

      </div>
      </section>

       {/* Popup GitHub */}
      {showGithubPopup && (
        <div className="popup-overlay" onClick={() => setShowGithubPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowGithubPopup(false)}>
              <X size={20} />
            </button>
            <h3>Accès GitHub restreint</h3>
            <p>
              Désolé, pour des raisons de sécurité le code reste privé.<br />
              Veuillez cliquer sur <strong>Tester la Demo</strong> pour avoir un aperçu de l’application.
            </p>
          </div>
        </div>
      )} 
          

      <style jsx>{`

      .popup-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .popup-box {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          max-width: 400px;
          text-align: center;
          position: relative;
        }
        .popup-box h3 {
          margin-bottom: 1rem;
          color: #fa4f05;
        }
        .popup-box p {
          font-size: 1rem;
          color: #333;
        }
        .popup-close {
          position: absolute;
          top: 10px; right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }



        /* bouton toggle visible seulement en mobile */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
        }

       /* Mobile */
          @media (max-width: 768px) {
          .menu-toggle {
          display: block; /* bouton visible */
        }

        .nav-links {
          position: absolute;
          top: 70px; /* juste sous ton header */
          right: -100%; /* caché hors écran */
          flex-direction: column;
          background: rgba(26, 26, 46, 0.95);
          padding: 1.5rem;
          width: 220px;
          height: calc(100vh - 70px);
          border-left: 1px solid rgba(0, 255, 136, 0.3);
          transition: right 0.3s ease; /* animation slide */
        }

        .nav-links.open {
          right: 0; /* visible quand on ajoute la classe open */
        }
      }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .projet-container {
          font-family: 'Arial', sans-serif;
          color: #333;
          overflow-x: hidden;
          position: relative;
          z-index:1;
        }

        .background-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background: black;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(15px);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0, 255, 136, 0.2);
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid #00ff88;
          color: #00ff88;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: #00ff88;
          color: #1a1a2e;
          transform: translateY(-2px);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-links button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links button:hover {
          color: #00ff88;
          transform: translateY(-2px);
        }

        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #00ff88;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-links button:hover::after {
          width: 100%;
        }

        /* Hero Section */
        .projet-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 2rem;
          position: relative;
        }

        .hero-content {
          max-width: 1200px;
          text-align: center;
          color: white;
        }

        .projet-badge {
          display: inline-block;
          margin-bottom: 2rem;
        }

        .projet-badge span {
          padding: 0.5rem 1.5rem;
          background: linear-gradient(45deg, #00ff88, #00d4aa);
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: bold;
          color: #1a1a2e;
        }

        .projet-title {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          background: linear-gradient(45deg, #fff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .projet-description {
          font-size: 1.2rem;
          margin-bottom: 3rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Video Container */
        .video-container {
          position: relative;
          /* augmenter légèrement la longueur/hauteur et la largeur max */
          max-width: 860px; /* largeur un peu plus grande */
          width: 100%;
          margin: 0 auto;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 22px 44px rgba(0, 0, 0, 0.45);
          background: #000;
          /* garder un ratio 16:9 */
          aspect-ratio: 16 / 9;
          max-height: 540px; /* hauteur augmentée */
        }

        .demo-video {
          width: 100%;
          height: 100%;
          display: block;
          /* affiche toute la vidéo dans le cadre réduit sans la découper */
          object-fit: contain;
          background: #000;
        }

        .video-controls {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 1rem;
        }

        .control-btn {
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          padding: 0.8rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover {
          background: rgba(0, 255, 136, 0.8);
          transform: scale(1.1);
        }

        .play-btn {
          background: rgba(0, 255, 136, 0.9);
          padding: 1rem;
        }

        .video-overlay {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          padding: 1rem 2rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .video-info h3 {
          color: #00ff88;
          margin-bottom: 0.5rem;
        }

        .video-info p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        /* Details Section */
        .projet-details {
          padding: 5rem 2rem;
          background: #34817dff;
          backdrop-filter: blur(10px);
        }

        .details-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .detail-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(0, 255, 136, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .detail-card:hover {
          transform: translateY(-10px);
          border-color: #00ff88;
          box-shadow: 0 20px 40px rgba(0, 255, 136, 0.1);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .detail-card h3 {
          color: #00ff88;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .detail-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .stat {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: bold;
          color: #00ff88;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Tech Section */
        .projet-tech {
          padding: 5rem 2rem;
          background: black;
          backdrop-filter: blur(10px);
        }

        .tech-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tech-container h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: white;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .tech-category h3 {
          color: #00ff88;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .tech-items {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          color: white;
        }

        .tech-item {
          padding: 0.7rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 25px;
          color: white;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .tech-item:hover {
          background: rgba(0, 255, 136, 0.2);
          border-color: #00ff88;
          transform: translateY(-3px);
        }

        .tech-item.react {
          background: rgba(97, 218, 251, 0.2);
          border-color: #61dafb;
          color: #ffffffff;

          
        }

        /* Social Section */
        .projet-social {
          padding: 5rem 2rem;
          background: #34817dff;
          backdrop-filter: blur(10px);
        }

        .social-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .social-container h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .social-container p {
          color: rgba(255, 255, 255, 0.93);
          font-size: 1.1rem;
          margin-bottom: 3rem;
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .social-link {
          background: transparent;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          border-radius: 20px;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
          border: 5px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .social-link:hover {
          transform: translateY(-10px);
          border-color: var(--social-color);
        }

        .social-link:hover .social-bg {
          opacity: 0.1;
        }

        .social-link:hover .social-icon {
          color: var(--social-color);
        }

        .social-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--social-color);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .social-icon {
          transition: all 0.3s ease;
        }

        .social-name {
          font-weight: bold;
        }

        .cta-section {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          position: relative;
          padding: 1rem 2.5rem;
          border: 2px solid #00ff88;
          background: transparent;
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .cta-button.secondary {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
        }

        .cta-button:hover .cta-bg {
          transform: translateX(0);
        }

        .cta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #00ff88;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: -1;
        }

        .cta-button.secondary .cta-bg {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .projet-title {
            font-size: 2.5rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-links button {
            font-size: 0.9rem;
            padding: 0.3rem 0.8rem;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .tech-grid {
            grid-template-columns: 1fr;
          }

          .social-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .cta-section {
            flex-direction: column;
            align-items: center;
          }

          .video-controls {
            bottom: 10px;
            right: 10px;
            gap: 0.5rem;
          }

          .control-btn {
            padding: 0.6rem;
          }

          .play-btn {
            padding: 0.8rem;
          }
          
          /* Mobile: rendre le cadre un peu plus grand et garantir object-fit */
          .video-container {
            max-width: 100%;
            aspect-ratio: 16 / 9;
            max-height: 360px;
            border-radius: 10px;
          }

          .demo-video {
            object-fit: contain;
          }
        }
      `}</style>
    </div>
  );
}

export default Projet1;