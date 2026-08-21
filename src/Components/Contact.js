import React, { useState } from "react";
import emailjs from "emailjs-com";
import './Contact.css';

function PortFolio() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    message: ''
  });

  // === Form Handlers ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      {/* Contact */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <br></br>
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
          

          <div className="contact-info">
            <h3>Informations de contact</h3>
            <div className="contact-links">              
              <a 
                href="https://wa.me/2250757109835" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link"
              >
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
              <a 
                href="tel:+2250757109835" 
                className="contact-link"
              >
                <i className="fas fa-phone"></i>
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