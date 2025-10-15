import React, { useState, useEffect } from 'react';
import './certificats.css';

// Import des images depuis le dossier assets
import reactImg from '../assets/react js.webp';
import reactNativeImg from '../assets/react native.webp';
import pythonDjangoImg from '../assets/python django.webp';
import laravelImg from '../assets/laravel.webp';
import figmaImg from '../assets/figma.webp';

const images = [
    { src: reactImg, description: 'Certification React Js', link: 'https://ude.my/UC-bb63cd99-4ed8-4bb6-b25f-827d3d44f4ed' },
    { src: reactNativeImg, description: 'Certification React Native & expo', link: 'https://ude.my/UC-44e2effa-6a2f-49e8-ac22-10379bdc476b' },
    { src: pythonDjangoImg, description: 'Certification Python & Django', link: 'https://ude.my/UC-7cb7ddb1-b97a-4e2c-b1ec-e0ae33348633' },
    { src: laravelImg, description: 'Certification Laravel & php', link: 'https://ude.my/UC-d70b19ba-c65d-47b7-93e9-f154e5cadea9' },
    { src: figmaImg, description: 'Certification Figma', link: 'https://ude.my/UC-8c4710b6-2e07-4d0f-aaf5-54c80515а6а9' }
];

function Certificats() {
    const [index, setIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = React.useRef(null);

    // calcule le nombre d'items visibles selon la largeur
    useEffect(() => {
        function updateVisible() {
            const w = window.innerWidth;
            if (w >= 1100) setVisibleCount(3);
            else if (w >= 700) setVisibleCount(2);
            else setVisibleCount(1);
        }
        updateVisible();
        window.addEventListener('resize', updateVisible);
        return () => window.removeEventListener('resize', updateVisible);
    }, []);

    // autoplay gauche -> droite
    useEffect(() => {
        if (images.length <= visibleCount) return; // rien à défiler
        if (isPaused) return;
        const interval = setInterval(() => {
            setIndex(prev => {
                const maxStart = Math.max(0, images.length - visibleCount);
                const next = prev + 1;
                return next > maxStart ? 0 : next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [visibleCount, isPaused]);

    const nextSlide = () => {
        const maxStart = Math.max(0, images.length - visibleCount);
        setIndex(prev => (prev + 1 > maxStart ? 0 : prev + 1));
    };

    const prevSlide = () => {
        const maxStart = Math.max(0, images.length - visibleCount);
        setIndex(prev => (prev - 1 < 0 ? maxStart : prev - 1));
    };

    // keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [visibleCount]);

    // calcul de translate
    const maxStart = Math.max(0, images.length - visibleCount);

    return (
        <div
            className="certificats-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="certificats-viewport">
                <div
                    className="certificats-track"
                    ref={trackRef}
                    style={{
                        transform: `translateX(-${(index * 100) / visibleCount}%)`,
                        gridTemplateColumns: `repeat(${images.length}, calc(100% / ${visibleCount}))`
                    }}
                >
                    {images.map((img, i) => (
                        <div className="certificats-item" key={i}>
                            {img.src ? (
                                <a href={img.link} target="_blank" rel="noopener noreferrer">
                                    <img src={img.src} alt={img.description || `certificat ${i+1}`} />
                                </a>
                            ) : (
                                <div className="certificats-placeholder">Aucune image</div>
                            )}
                            <p className="certificats-description">{img.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="certificats-controls">
                <button onClick={prevSlide} className="certificats-arrow certificats-left" aria-label="Précédent">
                    {/* SVG flèche gauche */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button onClick={nextSlide} className="certificats-arrow certificats-right" aria-label="Suivant">
                    {/* SVG flèche droite */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Dots de position (facultatif) */}
            <div className="certificats-dots" aria-hidden>
                {Array.from({ length: maxStart + 1 }).map((_, i) => (
                    <div key={i} className={`certificats-dot ${i === index ? 'active' : ''}`} />
                ))}
            </div>
        </div>
    );
}

export default Certificats;