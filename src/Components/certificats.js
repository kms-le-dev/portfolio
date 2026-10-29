import React from 'react';
import './certificats.css';

// Import des images depuis le dossier assets
import attestationImg from '../assets/attestation.PNG';
import attestationPdf from '../assets/Attestation execution.pdf';
import reactImg from '../assets/react js.webp';
import reactNativeImg from '../assets/react native.webp';
import pythonDjangoImg from '../assets/python django.webp';
import laravelImg from '../assets/laravel.webp';
import figmaImg from '../assets/figma.webp';
import sqlImg from '../assets/cert-sql.webp';
import dockerImg from '../assets/cert-docker.webp';
import javaImg from '../assets/cert-java.webp';
import sqlPdf from '../assets/Certificat - Silue sql.pdf';
import dockerPdf from '../assets/Certificat - Silue docker .pdf';
import javaPdf from '../assets/Certificat - Silue java .pdf';

const images = [
    { src: attestationImg, description: 'Attestation de bonne exécution', link: attestationPdf },
    { src: reactImg, description: 'Certification React Js', link: 'https://ude.my/UC-bb63cd99-4ed8-4bb6-b25f-827d3d44f4ed' },
    { src: reactNativeImg, description: 'Certification React Native & expo', link: 'https://ude.my/UC-44e2effa-6a2f-49e8-ac22-10379bdc476b' },
    { src: pythonDjangoImg, description: 'Certification Python & Django', link: 'https://ude.my/UC-7cb7ddb1-b97a-4e2c-b1ec-e0ae33348633' },
    { src: laravelImg, description: 'Certification Laravel & php', link: 'https://ude.my/UC-d70b19ba-c65d-47b7-93e9-f154e5cadea9' },
    { src: figmaImg, description: 'Certification Figma', link: 'https://www.udemy.com/certificate/UC-8c4710b6-2e07-4d0f-aaf5-54c80515a6a9/' },
    { src: sqlImg, description: 'Certification SQL', link: sqlPdf },
    { src: dockerImg, description: 'Certification Docker', link: dockerPdf },
    { src: javaImg, description: 'Certification Java & Spring Boot', link: javaPdf }
];

function Certificats() {
    return (
        <div className="certificats-container">
            <div className="certificats-grid">
                {images.map((img) => (
                    <div className="certificats-card" key={img.description}>
                        {img.src ? (
                            <a href={img.link} target="_blank" rel="noopener noreferrer" className="certificats-link">
                                <img src={img.src} alt={img.description} loading="lazy" decoding="async" className="certificats-image" />
                            </a>
                        ) : (
                            <div className="certificats-placeholder">Aucune image</div>
                        )}
                        <p className="certificats-description">{img.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Certificats;