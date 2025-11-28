import React from "react";
import { useNavigate } from "react-router-dom";
import './EnCours.css';
import { HashLink } from "react-router-hash-link";

function EnCours() {
   

  return (
    <div className="fullscreen-container">
      <h1>Projet en cours...</h1>
      <HashLink smooth to="/#projets" className="back-btn">
        Retour
      </HashLink>
    </div>
  );
}

export default EnCours;
