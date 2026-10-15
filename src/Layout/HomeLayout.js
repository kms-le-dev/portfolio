import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import './HomeLayout.css';
import ferkePwaPreview from '../assets/profil dev.png';
import cvPDF from '../assets/CV KANIGUI MOISE SILUÉ.pdf';
import Projets from '../Components/Projets';
import Certificats from '../Components/certificats';
import Contact from '../Components/Contact';
import CV from '../Components/Cv';
import ScrollDirectionButton from '../Components/ScrollDirectionButton';

const navItems = [
  { id: 'home', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'cv', label: 'CV' },
  { id: 'about', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
];

const serviceItems = [
  {
    id: 'web-platforms',
    label: 'Sites & plateformes web',
    excerpt: 'Landing pages, SaaS, boutiques et sites vitrine pensés pour convertir.',
    detail:
      'Je conçois des expériences claires et crédibles, avec une architecture robuste et un parcours utile pour chaque visiteur, qu’il s’agisse d’un client B2B ou d’une mission freelance.',
    tags: ['React', 'Laravel', 'UI/UX', 'Performance'],
  },
  {
    id: 'apps',
    label: 'Applications métier',
    excerpt: 'Interfaces intelligentes, gestion d’entreprise et workflows adaptés au terrain.',
    detail:
      'J’aide les équipes à remplacer leurs process manuels par des outils fiables, plus rapides à administrer et plus faciles à utiliser au quotidien.',
    tags: ['PHP', 'API REST', 'MySQL', 'Automatisations'],
  },
  {
    id: 'mobile',
    label: 'Applications mobiles',
    excerpt: 'Expérience native-like sur iOS et Android, conçue pour les usages réels.',
    detail:
      'Je développe des applications multiplateformes avec un bon équilibre entre vitesse, ergonomie et faisabilité, depuis le prototype jusqu’à la mise en production.',
    tags: ['React Native', 'Expo', 'App Store', 'UX mobile'],
  },
  {
    id: 'architecture',
    label: 'Architecture & backend',
    excerpt: 'API, données, sécurité, évolutivité et maintenance sans friction.',
    detail:
      'Je pose les fondations techniques nécessaires pour éviter les refontes, sécuriser les données et préparer la croissance du produit.',
    tags: ['Laravel', 'API REST', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'optimization',
    label: 'Audit & optimisation',
    excerpt: 'Diagnostic, gains rapides et amélioration continue de l’expérience produit.',
    detail:
      'Je mets le doigt sur ce qui freine la conversion, l’adoption ou la stabilité, puis je propose des corrections priorisées et des améliorations visibles.',
    tags: ['UX review', 'SEO', 'Debugging', 'Performance'],
  },
];

const skills = [
  {
    title: 'Frontend',
    items: ['React.js', 'JavaScript', 'Tailwind CSS', 'UX/UI', 'Responsive design'],
  },
  {
    title: 'Backend',
    items: ['PHP', 'Laravel', 'API REST', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Mobile',
    items: ['React Native', 'Expo', 'Design mobile', 'GitHub', 'Tests'],
  },
  {
    title: 'Outils & workflow',
    items: ['Figma', 'Git & GitHub', 'Firebase', 'SQL', 'Responsive design'],
  },
];

const experience = [
  {
    period: '2024 — Aujourd’hui',
    title: 'Développeur Fullstack / Freelance',
    place: 'Indépendant',
    text: 'Conception et livraison de sites web, applications métier, outils de gestion et solutions mobiles pour des projets à forte valeur ajoutée.',
  },
  {
    period: '2024 — Aujourd’hui',
    title: 'Consultant IT • Winlogic',
    place: 'Abidjan',
    text: 'Accompagnement des utilisateurs, paramétrage applicatif, support quotidien et amélioration des workflows métiers.',
  },
  {
    period: '2020 — 2024',
    title: 'Développeur Fullstack',
    place: 'AFROTECHPLUS',
    text: 'Création de sites vitrine, e-commerce, applications de gestion et solutions web sur mesure.',
  },
  {
    period: '2018 — 2020',
    title: 'Gérant de cyber / répétiteur',
    place: 'Abobo Baoulé',
    text: 'Gestion d’un espace numérique, accompagnement technique et soutien pédagogique en informatique.',
  },
];

const process = [
  {
    title: 'Cadrer',
    detail: 'Clarifier les besoins, les utilisateurs et les contraintes du projet.',
  },
  {
    title: 'Concevoir',
    detail: 'Définir les parcours et l’interface avant de développer.',
  },
  {
    title: 'Développer',
    detail: 'Construire les fonctionnalités et les vérifier sur des cas d’usage.',
  },
  {
    title: 'Livrer',
    detail: 'Préparer la mise à disposition et les ajustements convenus.',
  },
];

const marqueeItems = [
  'Applications web',
  'API REST',
  'React',
  'Laravel',
  'React Native',
  'PHP',
  'MySQL',
  'Python',
  'Django',
  'Figma',
];

export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell footer-inner">
        <div className="footer-identity">
          <span className="footer-name">Silué Kanigui Moise</span>
          <span className="footer-role">Ingénieur logiciel · Développeur fullstack</span>
        </div>
        <div className="footer-links">
          <a href="/#about">À propos</a>
          <a href="/#projects">Projets</a>
          <a href="/#skills">Compétences</a>
          <a href="/#experience">Expérience</a>
          <a href="/#cv">CV</a>
          <a href="/#contact">Contact</a>
        </div>
        <div className="footer-meta">
          © {new Date().getFullYear()} <span aria-hidden="true">·</span> Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

function HomeLayout() {
  const [activeService, setActiveService] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollProgressRef = useRef(null);
  const menuToggleRef = useRef(null);
  const mainNavigationRef = useRef(null);

  useEffect(() => {
    let animationFrame = null;
    let contentResizeObserver = null;

    const handleScroll = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

        if (scrollProgressRef.current) {
          scrollProgressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
        }
        animationFrame = null;
      });
    };

    if ('ResizeObserver' in window) {
      contentResizeObserver = new ResizeObserver(handleScroll);
      contentResizeObserver.observe(document.documentElement);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (contentResizeObserver) contentResizeObserver.disconnect();
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopViewport = window.matchMedia('(min-width: 681px)');
    const backgroundSections = document.querySelectorAll('.background-section');
    let animationFrame = null;

    if (!desktopViewport.matches || reduceMotion.matches) return undefined;

    const updateParallax = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        backgroundSections.forEach((section) => {
          const bounds = section.getBoundingClientRect();
          const distanceFromCenter = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
          const offset = Math.max(-42, Math.min(42, distanceFromCenter * 0.035));
          section.style.setProperty('--parallax-offset', `${offset}px`);
        });
        animationFrame = null;
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);

    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      backgroundSections.forEach((section) => section.style.removeProperty('--parallax-offset'));
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!('IntersectionObserver' in window)) return undefined;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.3;
      const currentSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= activationLine && bounds.bottom > activationLine;
      });

      if (currentSection) setActiveSection(currentSection.id);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      '.hero-copy, .hero-visual, .marquee-wrap, .section-heading, .accordion-item, .project-card, .skill-card, .timeline-item, .technology-card, .about-copy, .about-metrics, .proof-card, .certificats-card, .process-step, .cta-card, .contact-panel, .cv-section'
    );
    const reduceMotion = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    if (
      reduceMotion
      || document.visibilityState === 'hidden'
      || !('IntersectionObserver' in window)
    ) {
      revealTargets.forEach((element) => element.classList.add('scroll-reveal-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('scroll-reveal-visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px',
    });

    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      const siblingIndex = element.parentElement
        ? Array.from(element.parentElement.children).indexOf(element)
        : index;
      element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex * 70, 280)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnOutsidePointer = (event) => {
      const target = event.target;
      if (
        mainNavigationRef.current?.contains(target)
        || menuToggleRef.current?.contains(target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvPDF;
    link.download = 'CV KANIGUI MOISE SILUÉ.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="site-shell">
      <div ref={scrollProgressRef} className="scroll-progress-bar" aria-hidden="true" />

      <header className="topbar-wrap">
        <div className="topbar container-shell">
          <div className="header-role">Ingénieur Génie Logiciel</div>
          <nav ref={mainNavigationRef} id="main-navigation" className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link${activeSection === item.id ? ' is-active' : ''}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                  if (isMenuOpen) menuToggleRef.current?.focus();
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="mailto:kanigui43@gmail.com" className="nav-ghost-btn">
              <Mail size={16} />
              Email
            </a>
            <a href="#contact" className="nav-primary-btn" onClick={() => setIsMenuOpen(false)}>
              Me contacter
            </a>
          </div>
          <button
            ref={menuToggleRef}
            type="button"
            className="mobile-menu-toggle"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main className="portfolio-page">
        <div className="background-section background-section--one">
          <section className="hero container-shell" id="home">
          <div className="hero-copy">
            <h1>
              Des applications web et mobiles
              <span className="gradient-text"> pensées pour vos usages.</span>
            </h1>

            <div className="hero-visual" aria-label="Aperçu de la PWA FERKE.COM">
              <div className="profile-frame">
                <img src={ferkePwaPreview} alt="Capture d’écran de la PWA FERKE.COM" loading="eager" />
              </div>
            </div>

            <p className="hero-subtitle">
              Ingénieur logiciel et développeur fullstack, je conçois des sites, des outils métier et des applications mobiles, du cadrage du besoin jusqu’à la livraison.
            </p>

            <div className="cta-row">
              <a href="#projects" className="primary-btn">
                Voir mes projets
                <ArrowRight size={18} />
              </a>
              <button type="button" className="secondary-btn" onClick={handleDownloadCV}>
                Télécharger mon CV
              </button>
            </div>

            <div className="social-row" aria-label="Me contacter et retrouver mon profil professionnel">
              <a href="https://www.linkedin.com/in/kanigui-moise-silu%C3%A9-081989319" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:kanigui43@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>

          </div>
          </section>

          <section className="marquee-wrap" aria-label="Compétences en mouvement">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="marquee-item" aria-hidden={index >= marqueeItems.length}>
                {item}
              </span>
            ))}
          </div>
          </section>

          <section className="services section-shell" id="services">
          <div className="section-heading">
            <p className="kicker">Services</p>
            <h2>Web, mobile et <span className="heading-accent">outils métier</span> : de l’idée à l’usage.</h2>
          </div>

          <div className="accordion" aria-label="Services accordéon">
            {serviceItems.map((service, index) => {
              const isOpen = activeService === index;
              return (
                <article key={service.id} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                  <button type="button" className="accordion-trigger" onClick={() => setActiveService(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    <span className="accordion-index">0{index + 1}</span>
                    <span className="accordion-copy">
                      <span className="accordion-label">{service.label}</span>
                      <span className="accordion-excerpt">{service.excerpt}</span>
                    </span>
                    <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="accordion-panel">
                      <p>{service.detail}</p>
                      <div className="tag-list">
                        {service.tags.map((tag) => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          </section>
        </div>

        <div className="background-section background-section--two">
          <section className="projects section-shell" id="projects">
          <div className="section-heading section-heading-inline">
            <div>
              <p className="kicker">Projets</p>
              <h2>Des projets <span className="heading-accent">web et mobiles</span>, avec leur périmètre et leur stack.</h2>
            </div>
            <a href="#contact" className="inline-link">
              Discuter votre projet
              <ArrowRight size={16} />
            </a>
          </div>
          <Projets />
          </section>

          <section className="skills section-shell" id="skills">
          <div className="section-heading">
            <p className="kicker">Compétences</p>
            <h2>Les technologies <span className="heading-accent">mobilisées</span> dans mon travail.</h2>
          </div>

          <div className="skill-grid">
            {skills.map((group) => (
              <article key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}><CheckCircle2 size={16} /> {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          </section>

          <section className="experience section-shell" id="experience">
          <div className="section-heading">
            <p className="kicker">Expérience</p>
            <h2><span className="heading-accent">Développement</span>, accompagnement applicatif et transmission.</h2>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.period}-${item.title}`} className="timeline-item">
                <div className="timeline-period">{item.period}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          </section>
        </div>

        <div className="background-section background-section--two">
          <section className="cv-section-shell section-shell" id="cv" aria-label="Curriculum Vitae">
            <CV />
          </section>

          <section className="about section-shell" id="about" aria-label="À propos">
          <div className="about-grid">
            <div className="about-copy">
              <p className="kicker">À propos</p>
              <h2><span className="heading-accent">Un parcours</span> entre développement et besoins métier.</h2>
              <p className="about-summary">
                Mon expérience combine le développement fullstack, l’accompagnement d’utilisateurs et la formation. J’ai travaillé sur des sites vitrines et e-commerce, des outils de gestion, des PWA et des applications mobiles.
              </p>
              <p>
                Je privilégie les échanges directs, des fonctionnalités compréhensibles et des choix techniques adaptés au contexte du projet.
              </p>
            </div>

            <div className="about-metrics">
              <div className="metric-box">
                <span className="metric-label">Méthodologie</span>
                <strong>Prototypes → build → amélioration</strong>
              </div>
              <div className="metric-box">
                <span className="metric-label">Engagement</span>
                <strong>Communication claire & réactive</strong>
              </div>
              <div className="metric-box">
                <span className="metric-label">Qualité</span>
                <strong>Code propre & orienté maintenabilité</strong>
              </div>
            </div>
          </div>
          </section>

          <section className="social-proof section-shell" aria-label="Repères professionnels">
          <div className="section-heading">
            <p className="kicker">Repères concrets</p>
            <h2>Des éléments concrets à consulter.</h2>
          </div>

          <div className="proof-grid">
              <article className="proof-card">
                <span className="proof-card__label">Portfolio</span>
                <h3>25 projets présentés</h3>
                <p>Sites vitrines, plateformes de gestion et applications web ou mobiles, avec leur description et leur stack.</p>
              </article>
              <article className="proof-card">
                <span className="proof-card__label">Parcours</span>
                <h3>Expériences détaillées</h3>
                <p>Développement fullstack, activité freelance et accompagnement applicatif en environnement métier.</p>
              </article>
              <article className="proof-card">
                <span className="proof-card__label">Formation</span>
                <h3>Compétences documentées</h3>
                <p>Parcours de formation et attestations consultables dans le CV et la section dédiée.</p>
              </article>
          </div>
          </section>

          <section className="certifications section-shell" aria-label="Certifications">
          <div className="section-heading">
            <p className="kicker">Certifications</p>
            <h2><span className="heading-accent">Certifications</span> et attestations consultables.</h2>
          </div>
          <Certificats />
          </section>

          <section className="process section-shell" aria-label="Processus de collaboration">
          <div className="section-heading">
            <p className="kicker">Process</p>
            <h2>Un <span className="heading-accent">partenariat clair</span> pour aller de l’idée à la solution.</h2>
          </div>

          <div className="process-grid">
            {process.map((step, index) => (
              <div key={step.title} className="process-step">
                <span className="process-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
          </section>

          <section className="cta-contact section-shell" id="contact">
          <div className="cta-card">
            <div className="cta-copy">
              <p className="kicker">Parlons de votre besoin</p>
              <h2>Un projet <span className="heading-accent">web ou mobile</span> à concrétiser ?</h2>
              <p>Présentez-moi votre contexte, vos objectifs et vos contraintes. Nous pourrons définir ensemble le périmètre et les prochaines étapes.</p>
            </div>

            <div className="cta-actions">
              <a href="mailto:kanigui43@gmail.com" className="primary-btn">
                <Mail size={18} />
                kanigui43@gmail.com
              </a>
              <a href="mailto:kanigui43@gmail.com?subject=Prise%20de%20rendez-vous" className="secondary-btn">
                <CalendarDays size={18} />
                Planifier un échange
              </a>
            </div>
          </div>

          <div className="contact-panel">
            <Contact />
          </div>
          </section>

        <PortfolioFooter />
        </div>
      </main>
      <ScrollDirectionButton />
    </div>
  );
}

export default HomeLayout;