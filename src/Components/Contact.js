import React, { useState } from "react";
import emailjs from "emailjs-com";
import { MessageCircle, Phone } from 'lucide-react';
import './Contact.css';

function PortFolio() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    if (honeypot.trim()) {
      setFeedback({ type: 'error', message: 'Le message n’a pas pu être envoyé. Veuillez réessayer.' });
      return;
    }

    setIsSending(true);
    setFeedback(null);

    try {
      await emailjs.send(
        'service_69u7nih',
        'template_fbmljnj',
        {
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          message: formData.message,
        },
        'KhurxGWTIehNK31ms'
      );
      setFormData({ prenom: '', nom: '', email: '', message: '' });
      setFeedback({ type: 'success', message: 'Votre message a bien été envoyé. Merci pour votre prise de contact.' });
    } catch (error) {
      console.error('Échec de l’envoi du formulaire de contact.', error);
      setFeedback({
        type: 'error',
        message: 'L’envoi a échoué. Réessayez ou écrivez-moi directement à kanigui43@gmail.com.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Contact */}
      <section className="contact">
        <div className="contact-container">
          <br></br>
          <h2>Contactez-moi</h2>
          <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSending}>
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="website">Ne remplissez pas ce champ</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input 
                  type="text" 
                  id="prenom" 
                  name="prenom"
                  autoComplete="given-name"
                  maxLength={80}
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
                  autoComplete="family-name"
                  maxLength={80}
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
                autoComplete="email"
                maxLength={254}
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
                maxLength={3000}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>
            {feedback && (
              <p className={`form-feedback form-feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
                {feedback.message}
              </p>
            )}

          <div className="contact-info">
            <h3>Informations de contact</h3>
            <div className="contact-links">              
              <a 
                href="https://wa.me/2250757109835" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a 
                href="tel:+2250757109835" 
                className="contact-link"
              >
                <Phone size={18} aria-hidden="true" />
                <span>Appel</span>
              </a>
            </div>
          </div>
          </form>
        </div>
      </section>
    </div>
  );
}


export default PortFolio;