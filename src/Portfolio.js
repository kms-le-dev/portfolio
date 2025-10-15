import React, { useEffect, useRef, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';
import emailjs from "emailjs-com";

// Images du dossier assets
import img1 from "./assets/moinschere.webp";
import img2 from "./assets/dashbord.webp";
import img3 from "./assets/odholding.PNG";
import img4 from "./assets/projet4.webp";
import headerImg from "./assets/IMG_3257.webp";
import img5 from "./assets/IMG_8A244AF8-65AE-4CAF-A55D-4473CC241732.jpeg";
import img6 from "./assets/projet4.webp";
import img7 from "./assets/projet4.webp";
import momo1 from "./assets/momo1.webp";
import animationVideo from "./assets/animation.mp4";

// Images de fond pour le carousel
import bg1 from "./assets/carousel1.jpeg";
import bg2 from "./assets/carousel2.jpeg";
import bg3 from "./assets/carousel3.jpeg";

// components 
import Certificats from "./Components/certificats";

function PortFolio() {
  // ✅ CORRECTION : Référence pour la vidéo
  const videoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mountRef = useRef(null);

  // ✅ CORRECTION : Un seul useEffect pour gérer la vidéo
  useEffect(() => {
    const handleVideoAutoplay = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        // Forcer les propriétés nécessaires pour l'autoplay
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.playsInline = true;
        
        // Tentative de lecture
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("✅ Vidéo lancée avec succès");
            })
            .catch((error) => {
              console.log("❌ Erreur autoplay:", error);
              // Nouvelle tentative après interaction utilisateur
              const attemptPlayOnInteraction = () => {
                videoElement.play().catch(() => {});
                document.removeEventListener('click', attemptPlayOnInteraction);
                document.removeEventListener('touchstart', attemptPlayOnInteraction);
              };
              document.addEventListener('click', attemptPlayOnInteraction);
              document.addEventListener('touchstart', attemptPlayOnInteraction);
            });
        }
        const video = videoRef.current;
  if (video) {
    video.muted = true;
    video.play().catch(err => {
      console.warn("Autoplay bloqué:", err);
    });
  }
      }
    };

  
  



    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(handleVideoAutoplay, 100);

    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    message: ''
  });

  // déclare les routes de tes projets
  const projectRoutes = [
    "/projet1",
    "/projet2",
    "/projet3",
    "/projet4",
    "/projet5",
    "/projet6"
  ];

  // Direction de la flèche ("down" ou "up")
  const [arrowDirection, setArrowDirection] = useState("down");
  // Pour savoir si on est tout en bas
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Gestion du clic sur la flèche
  const handleScrollArrow = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Détection scroll pour changer la direction de la flèche et animation designer pro
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (Math.ceil(scrollY + windowHeight) >= docHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }

      // Animation designer pro sur la section visible
      const sections = document.querySelectorAll('section, main');
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
          if (!sec.classList.contains('scroll-animate-in')) {
            sec.classList.add('scroll-animate-in');
            setTimeout(() => sec.classList.remove('scroll-animate-in'), 700);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialisation AOS pour les animations scroll
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
      mirror: true,
      offset: 60,
    });
    const onScroll = () => AOS.refresh();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pour le fond défilant
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [bg1, bg2, bg3];

  // Hook pour défilement automatique du fond
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3500);
    return () => clearInterval(bgInterval);
  }, []);

  const demoImages = [img1, img2, img3, img4];
  const portfolioImage = img5;

  useEffect(() => {
    if (!mountRef.current) return;

    // === Scene Setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ff88, 0.5, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // === Textures & Planes ===
    const loader = new THREE.TextureLoader();
    const planes = [];
    const geometry = new THREE.PlaneGeometry(2.5, 1.5);

    demoImages.forEach((imageUrl, i) => {
      const texture = loader.load(imageUrl);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      const material = new THREE.MeshLambertMaterial({ 
        map: texture, 
        transparent: true,
        opacity: 0
      });
      
      const plane = new THREE.Mesh(geometry, material);
      plane.position.x = i * 0.1;
      plane.rotation.y = Math.sin(i * 0.5) * 0.1;
      plane.castShadow = true;
      plane.receiveShadow = true;
      
      scene.add(plane);
      planes.push(plane);
    });

    // === Particles Background ===
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    mountRef.current.appendChild(renderer.domElement);

    // === Animation Variables ===
    let currentIndex = 0;
    let isTransitioning = false;

    // === Smooth Transition Function ===
    function transitionToImage(targetIndex) {
      if (isTransitioning) return;
      isTransitioning = true;

      const currentPlane = planes[currentIndex];
      const targetPlane = planes[targetIndex];

      new TWEEN.Tween(currentPlane.material)
        .to({ opacity: 0 }, 800)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();

      new TWEEN.Tween(currentPlane.rotation)
        .to({ y: currentPlane.rotation.y + Math.PI * 0.5 }, 800)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();

      targetPlane.material.opacity = 0;
      targetPlane.rotation.y = -Math.PI * 0.5;

      new TWEEN.Tween(targetPlane.material)
        .to({ opacity: 1 }, 800)
        .easing(TWEEN.Easing.Cubic.InOut)
        .delay(200)
        .start();

      new TWEEN.Tween(targetPlane.rotation)
        .to({ y: Math.sin(targetIndex * 0.5) * 0.1 }, 800)
        .easing(TWEEN.Easing.Cubic.InOut)
        .delay(200)
        .onComplete(() => {
          isTransitioning = false;
        })
        .start();

      currentIndex = targetIndex;
      setCurrentSlide(targetIndex);
    }

    // === Auto Carousel ===
    const autoSlide = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (currentIndex + 1) % planes.length;
        transitionToImage(nextIndex);
      }
    }, 4000);

    // === Animation Loop ===
    function animate() {
      animationRef.current = requestAnimationFrame(animate);

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      pointLight.position.x = Math.sin(Date.now() * 0.001) * 5;
      pointLight.position.y = Math.cos(Date.now() * 0.001) * 3;

      planes.forEach((plane, i) => {
        plane.position.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
      });

      if (typeof TWEEN !== 'undefined') {
        TWEEN.update();
      }

      renderer.render(scene, camera);
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.min.js';
    script.onload = () => {
      if (planes.length > 0) {
        planes[0].material.opacity = 1;
      }
      animate();
    };
    document.head.appendChild(script);

    // === Responsive ===
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // === Manual Navigation ===
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + planes.length) % planes.length;
        transitionToImage(prevIndex);
        clearInterval(autoSlide);
      } else if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % planes.length;
        transitionToImage(nextIndex);
        clearInterval(autoSlide);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // === Cleanup ===
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(autoSlide);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyPress);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      planes.forEach(plane => {
        plane.geometry.dispose();
        plane.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  // === Form Handlers ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.classList.add('section-animate-in');
    section.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      section.classList.remove('section-animate-in');
    }, 1800);
  };

  function TypewriterText({ text, speed = 15 }) {
    const [displayed, setDisplayed] = useState("");
    
    useEffect(() => {
      let i = 0;
      let timeout;
      function type() {
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          i++;
          timeout = setTimeout(type, speed);
        } else {
          timeout = setTimeout(() => {
            i = 0;
            type();
          }, 30000);
        }
      }
      type();
      return () => clearTimeout(timeout);
    }, [text, speed]);
    
    return (
      <p className="about-typewriter">
        <span>{displayed}</span>
        <span className="type-cursor">|</span>
      </p>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_69u7nih",
      "template_fbmljnj",
      {
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        message: formData.message,
      },
      "KhurxGWTIehNK31ms"
    )
    .then((result) => {
      alert("✅ Message envoyé avec succès !");
      setFormData({ prenom: "", nom: "", email: "", message: "" });
    })
    .catch((error) => {
      alert("❌ Erreur lors de l'envoi : " + error.text);
    });
  };

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <div className="header-title-animated">
              <span className="gradient-text">KANIGUI MOISE SILUE</span>
            </div>
            <div className="header-img-rect">
              <img src={headerImg} alt="Moi" />
            </div>
          </div>

          <button className={`burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-links${menuOpen ? ' show' : ''}`}>
            <li><button onClick={() => {scrollToSection('accueil'); setMenuOpen(false);}}>Accueil</button></li>
            <li><button onClick={() => {scrollToSection('apropos'); setMenuOpen(false);}}>À propos</button></li>
            <li><button onClick={() => {scrollToSection('certificats'); setMenuOpen(false);}}>Certificats</button></li>
            <li><button onClick={() => {scrollToSection('projets'); setMenuOpen(false);}}>Projets</button></li>
            <li><button onClick={() => {scrollToSection('contact'); setMenuOpen(false);}}>Contact</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section avec Carousel 3D */}
      <section id="accueil" className="hero">
        <div className="carousel-bg-wrapper">
          {bgImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="bg-carousel"
              className={`carousel-bg ${bgIndex === idx ? 'active' : ''}`}
              style={{ opacity: bgIndex === idx ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="carousel-container" ref={mountRef}></div>
        
        <div className="hero-content carousel-text-bg">
          <h1 className="hero-title">Développeur Full Stack</h1>
          <p className="hero-subtitle">Créateur d'expériences numériques innovantes</p>
        </div>

        <div className="scroll-arrow" onClick={handleScrollArrow}>
          {isAtBottom ? "⬆️" : "⬇️"}
        </div>
      </section>

      {/* ✅ CORRECTION : À propos avec vidéo corrigée */}
      <main id="apropos" className="about" data-aos="fade-up">
        <div className="about-bg-video">
          <video
            ref={videoRef}
            src={animationVideo}
            autoPlay
            loop
            muted
            playsInline
            className="about-video-bg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
              zIndex: -1,
              opacity: 0.6,
              filter: 'brightness(0.7) contrast(1.1)',
              display: 'block',
              background: '#000',
            }}
            onLoadedData={() => {
              videoRef.current && (videoRef.current.style.display = 'block');
              console.log("Vidéo chargée");
            }}
            onError={(e) => {
              if (videoRef.current) videoRef.current.style.display = 'none';
              console.error("Erreur vidéo:", e);
            }}
          />
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <img src={portfolioImage} alt="Portrait" />
          </div>
          <div className="about-text">
            <h2>À propos de moi</h2>
            <TypewriterText
              text={`Je suis développeur full stack passionné, spécialisé dans la création d'applications modernes, performantes et adaptées aux besoins de chaque client.`}
              speed={15}
            />

            <p className="about-animated-text" data-aos="fade-right">
              <span className="highlight">Je suis développeur full stack passionné</span>, spécialisé dans la création d'applications modernes, performantes et adaptées aux besoins de chaque client.<br/>
              <span className="about-animated-line">Mon objectif est de <span className="gradient">transformer vos idées</span> en solutions concrètes et efficaces.</span><br/>
              J'utilise&nbsp;
              <span className="about-animated-line">HTML, CSS, JavaScript, PHP, Python</span> et des frameworks comme <span className="gradient">React.js, Laravel, Django etc... en fonction du projet.</span>.<br/>
              <span className="about-animated-line">Base de données : <span className="gradient">MySQL, PostgreSQL</span></span>.<br/>
              <span className="about-animated-line">J'intègre l'IA : <span className="gradient">ChatGPT, Claude AI, GitHub Copilot</span></span>.<br/>
              <span className="about-animated-line">Mon but : <span className="gradient">allier créativité, technologie et satisfaction client</span> pour vos projets ambitieux.</span>
            </p>
            <div className="skills" data-aos="fade-up">
              {["React.js","JavaScript","Node.js","Python","Django","PHP","Laravel","Html","Css","Bootstrap","React Native","Flutter","Figma","Docker"].map((skill, i) => (
                <span
                  className="skill animated-skill"
                  key={skill}
                  style={{
                    animationDelay: `${i * 0.13 + 0.2}s`,
                  }}
                >
                  {skill}
                  <span className="skill-glow"></span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <br></br>

      <div></div>

      {/* Certificats  */}
      <div id="certificats" className="certificats-section">
        <h2>Mes Certificats</h2>
        <Certificats />
      </div>

      {/* Projets */}
      <section id="projets" className="projects" data-aos="fade-up">
        <h2>Mes Projets</h2>
        <div className="projects-grid">
          {[img1, img2, img3, img4, img6, img7].map((imgSrc, idx) => (
            <div key={idx} className="project-card" data-aos="zoom-in-up">
              <img src={imgSrc} alt={`Projet ${idx + 1}`} />
              <div className="project-overlay">              
                <button
                  className="project-btn"
                  onClick={() => {
                    navigate(projectRoutes[idx]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact" data-aos="fade-up">
        <div className="contact-container">
          <h2>Contactez-moi</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input 
                  type="text" 
                  id="prenom" 
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="Votre prénom" 
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input 
                  type="text" 
                  id="nom" 
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Votre nom" 
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre.email@exemple.com" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Votre message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Envoyer le message
            </button>
          </form>
        </div>
        <div className="footer">2025 Kanigui Moise Silué. @ Tous droits réservés.</div>
      </section>

      {/* ✅ CORRECTION : CSS amélioré pour la vidéo */}
      <style jsx>{`
        .scroll-arrow {
          position: fixed;
          bottom: 20px;
          right: 15%;
          transform: translateX(50%);
          font-size: 2rem;
          cursor: pointer;
          background: rgba(44, 62, 80, 0.8);
          color: #fff;
          padding: 10px 15px;
          border-radius: 50%;
          transition: transform 0.3s, background 0.3s;
          z-index: 1000;
        }

        .scroll-arrow:hover {
          transform: translateX(50%) scale(1.2);
          background: rgba(44, 62, 80, 1);
        }

        .carousel-text-bg {
          background: rgba(10, 10, 10, 0.55);
          border-radius: 22px;
          box-shadow: 0 6px 32px 0 rgba(0,0,0,0.18);
          padding: 2.5rem 2.5rem 2.2rem 2.5rem;
          display: inline-block;
          margin: 0 auto;
          max-width: 90vw;
        }

        .header-title-animated {
          display: flex;
          align-items: center;
          margin-right: 1.2rem;
          animation: fadeInLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .gradient-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(90deg, #00ff88 0%, #1a6cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(26,108,246,0.10);
          animation: gradientMove 2.5s linear infinite alternate;
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @media (max-width: 768px) {
          .header-title-animated {
            margin-right: 0.5rem;
          }
          .gradient-text {
            font-size: 1rem;
          }
        }

        .carousel-bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .carousel-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease;
          z-index: 0;
        }

        .carousel-bg.active {
          opacity: 1;
        }

        .scroll-animate-in {
          position: relative;
          overflow: hidden;
        }

        .scroll-animate-in::after {
          display: none;
        }

        @keyframes scrollMatrixRain {
          0% {
            opacity: 0.2;
            filter: blur(12px) brightness(1.2);
            transform: translateY(-60px) scaleY(0.8);
            color: #00ff88cc;
          }
          30% {
            opacity: 0.9;
            filter: blur(0.5px) brightness(1.08);
            transform: translateY(12px) scaleY(1.08);
            color: #1a6cf6cc;
          }
          60% {
            opacity: 0.7;
            filter: blur(0.2px) brightness(1.04);
            transform: translateY(0) scaleY(1.01);
            color: #fff;
          }
          100% {
            opacity: 0;
            filter: blur(0) brightness(1);
            transform: translateY(0) scaleY(1);
            color: #00ff88cc;
          }
        }

        .section-animate-in {
          animation: sectionFadeSlideIn3D 1.1s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 24px 64px 0 #00ff88aa, 0 0 32px #1a6cf6cc;
          background: linear-gradient(120deg, #00ff88 0%, #1a6cf6 100%);
          border-radius: 32px;
          perspective: 900px;
          position: relative;
          overflow: visible;
        }

        .section-particles-canvas {
          pointer-events: none;
          border-radius: 32px;
          z-index: 10;
        }

        @keyframes sectionFadeSlideIn3D {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.96) rotateX(30deg) skewY(6deg);
            filter: blur(12px) brightness(1.2);
          }
          40% {
            opacity: 0.7;
            transform: translateY(-12px) scale(1.04) rotateX(-8deg) skewY(-2deg);
            filter: blur(2px) brightness(1.08);
          }
          80% {
            opacity: 1;
            transform: translateY(0) scale(1.01) rotateX(0deg) skewY(0deg);
            filter: blur(0) brightness(1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg) skewY(0deg);
            filter: blur(0) brightness(1);
          }
        }

        .about-typewriter {
          font-size: 1.15rem;
          margin-bottom: 2rem;
          color: #fff;
          line-height: 1.7;
          position: relative;
          background: rgba(255,255,255,0.02);
          border-radius: 18px;
          padding: 1.2rem 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(246,106,46,0.08);
          transition: box-shadow 0.3s, background 0.3s;
          overflow: hidden;
          min-height: 180px;
          white-space: pre-line;
        }

        .about-typewriter .type-cursor {
          display: inline-block;
          width: 1ch;
          color: #00ff88;
          animation: blink 0.7s steps(1) infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ✅ CORRECTION : CSS amélioré pour la vidéo de fond */
        .about-bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1; /* Derrière le contenu */
        }

        .about-video-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          z-index: -1;
          opacity: 0.6; /* Légère transparence pour la lisibilité du contenu */
          filter: brightness(0.7) contrast(1.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .portfolio-container {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        .footer {
          width: 100%;
          padding: 20px;
          background-color: #222;
          color: #fff;
          text-align: center;
          font-size: 14px;
          position: relative;
          margin-top: 40px;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-img-rect {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(26,108,246,0.10);
        }

        .header-img-rect img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          transition: right 0.3s;
        }

        .burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1201;
        }

        .burger span {
          display: block;
          width: 28px;
          height: 3px;
          margin: 4px 0;
          background: #00ff88;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .burger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .burger.open span:nth-child(2) {
          opacity: 0;
        }

        .burger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
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
        }

        .nav-links button:hover {
          background: #00ff88;
          color: #1a1a2e;
          transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .carousel-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 800px;
          padding: 2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #00ff88, #00d4aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 1s ease;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          animation: fadeInUp 1s ease 0.3s both;
        }

        /* About Section */
        .about {
          position: relative;
          padding: 5rem 2rem;
          background: #000; /* Fallback */
          overflow: hidden;
          min-height: 600px;
          display: flex;
          align-items: stretch;
        }

        .about-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: center;
        }

        .about-image img {
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .about-image img:hover {
          transform: scale(1.05);
        }

        .about-text h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #00ff88;
        }

        .about-text p {
          font-size: 1.15rem;
          margin-bottom: 2rem;
          color: #fff;
          line-height: 1.7;
          position: relative;
          background: linear-gradient(90deg, #01040aff 0%, #031e3aff 100%);
          border-radius: 18px;
          padding: 1.2rem 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(246,106,46,0.08);
          transition: box-shadow 0.3s, background 0.3s;
          overflow: hidden;
        }

        

        .about-animated-text .highlight {
          color: #00ff88;
          font-weight: bold;
          font-size: 1.18em;
          letter-spacing: 0.5px;
          background: #00ff88;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: background 0.4s, color 0.4s;
        }

        .about-text p:hover .highlight {
          color: #1a6cf6;
          background: linear-gradient(90deg, #1a6cf6 0%, #0855a1ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-animated-line {
          display: inline-block;
          animation: aboutFadeIn 1.2s both;
          animation-delay: 0.2s;
          transition: background 0.4s, color 0.4s;
        }

        .about-animated-line:not(:first-child) {
          animation-delay: 0.5s;
        }

        .gradient {
          background: #00ff88;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          transition: background 0.4s, color 0.4s;
        }

        .about-text p:hover .gradient {
          background: linear-gradient(90deg, #1a6cf6 0%, #3a8dde 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes aboutFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
          justify-content: center;
          margin-top: 2.5rem;
          position: relative;
        }

        .animated-skill {
          position: relative;
          padding: 0.7rem 1.3rem;
          background: linear-gradient(90deg, #00ff88 0%, #1a6cf6 100%);
          color: #fff;
          border-radius: 30px;
          font-size: 1.05rem;
          font-weight: bold;
          box-shadow: 0 4px 18px 0 #00ff8855, 0 0 12px #1a6cf6cc;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
          animation: skillStaggerIn 0.85s cubic-bezier(.22,1,.36,1) backwards;
          will-change: transform, box-shadow;
          overflow: visible;
        }

        .animated-skill:hover {
          transform: scale(1.13) rotate(-2deg);
          box-shadow: 0 12px 32px 0 #00ff88cc, 0 0 32px #1a6cf6cc;
          background: linear-gradient(90deg, #1a6cf6 0%, #00ff88 100%);
          z-index: 2;
        }

        .animated-skill:active {
          transform: scale(0.97);
        }

        .animated-skill .skill-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          border-radius: 40px;
          background: radial-gradient(circle, #00ff88 0%, #1a6cf6 80%, transparent 100%);
          opacity: 0.18;
          filter: blur(12px);
          transform: translate(-50%, -50%) scale(1.1);
          pointer-events: none;
          z-index: 1;
          animation: skillGlowPulse 2.2s infinite alternate;
        }

        @keyframes skillStaggerIn {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.7) rotate(-8deg);
            filter: blur(8px);
          }
          60% {
            opacity: 0.7;
            transform: translateY(-8px) scale(1.08) rotate(2deg);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }

        @keyframes skillGlowPulse {
          0% {
            opacity: 0.18;
            filter: blur(12px);
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            opacity: 0.32;
            filter: blur(18px);
            transform: translate(-50%, -50%) scale(1.18);
          }
        }

        .animated-skill {
          animation-name: skillStaggerIn, skillFloat;
          animation-duration: 0.85s, 3.2s;
          animation-delay: var(--delay, 0s), 0.9s;
          animation-iteration-count: 1, infinite;
          animation-timing-function: cubic-bezier(.22,1,.36,1), ease-in-out;
        }

        @keyframes skillFloat {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-7px) scale(1.04) rotate(-2deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); }
        }

        /* Projects Section */
        .projects {
          padding: 5rem 2rem;
          background: url(${momo1}) center/cover no-repeat;
          color: white;
        }

        .projects h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #00ff88;
        }

        .certificats-section h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2.5rem;
          color: #00ff88;
        }

        .projects-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .project-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 255, 136, 0.13), 0 2px 12px rgba(0,255,136,0.08);
          transition: transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.4s, filter 0.4s;
          background: linear-gradient(135deg, #1a1a2e 60%, #00ff88 100%);
        }

        .project-card:hover {
          transform: scale(1.06) rotate(2deg) translateY(-12px);
          box-shadow: 0 32px 64px 0 rgba(0,255,136,0.25), 0 0 32px 0 #00ff88aa;
          filter: brightness(1.08) saturate(1.2) drop-shadow(0 0 18px #00ff88);
          background: linear-gradient(135deg, #00ff88 60%, #1a6cf6 100%);
        }

        .project-card img {
          width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
          object-fit: cover;
          border-radius: 0;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.4s, filter 0.4s;
          box-shadow: 0 8px 32px rgba(0,255,136,0.10);
          filter: brightness(0.95) saturate(1.1);
        }

        .project-card:hover img {
          transform: scale(1.08) rotate(-2deg);
          box-shadow: 0 16px 48px 0 rgba(0,255,136,0.25), 0 0 32px 0 #00ff88aa;
          filter: brightness(1.08) saturate(1.3) drop-shadow(0 0 12px #00ff88);
        }

        .project-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(26, 26, 46, 0.9));
          color: white;
          padding: 2rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-overlay {
          transform: translateY(0);
        }

        .project-overlay h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #00ff88;
        }

        .project-btn {
          padding: 0.5rem 1rem;
          background: #00ff88;
          color: #1a1a2e;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .project-btn:hover {
          background: #00d4aa;
          transform: translateY(-2px);
        }

        /* Contact Section */
        .contact {
          padding: 5rem 2rem;
          background: black;
        }

        .contact-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .contact h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #e0e0ecff;
        }

        .contact-form {
          background: #b8b8caff;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #1a1a2e;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #e0e0ecff;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #00ff88;
          box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(45deg, #00ff88, #00d4aa);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .projects-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 900px) {
          .nav {
            padding: 0 1rem;
          }
          .nav-links {
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          .about-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
          }
          .about-image img {
            max-width: 250px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .burger {
            display: flex;
          }
          .nav-links {
            position: fixed;
            top: 0;
            right: -100vw;
            flex-direction: column;
            background: linear-gradient(135deg, #1a1a2e 60%, #1a6cf6 100%);
            width: 70vw;
            max-width: 320px;
            height: 100vh;
            padding-top: 5rem;
            gap: 2rem;
            box-shadow: -2px 0 16px rgba(26,108,246,0.10);
            z-index: 1200;
            transition: right 0.3s;
            align-items: flex-start;
          }
          .nav-links.show {
            right: 0;
          }
          .nav-links li {
            width: 100%;
            text-align: left;
          }
          .nav-links button {
            font-size: 1.1rem;
            padding: 0.7rem 1.2rem;
            width: 100%;
            text-align: left;
            border-radius: 8px;
          }
          .nav-links button:hover {
            background: #00ff88;
            color: #1a1a2e;
          }
          .projects-grid {
            grid-template-columns: 1fr 1fr;
          }
          .project-card img {
            height: 110vw;
            max-height: 260px;
            min-height: 140px;
          }
          .project-overlay {
            padding: 1rem;
          }
          .contact-form {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.3rem;
          }
          .hero-content {
            padding: 1rem;
          }
          .about-image img {
            max-width: 140px;
          }
          .project-card img {
            height: 90px;
          }
          .project-overlay h3 {
            font-size: 1rem;
          }
          .project-btn {
            font-size: 0.8rem;
            padding: 0.3rem 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}


export default PortFolio;