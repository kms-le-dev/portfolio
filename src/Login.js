import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { googleLogin } from './api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const GOOGLE_CLIENT_ID = '753368488677-l8pfdla2sgd1ssirllnb5ppoqo0tfrr9.apps.googleusercontent.com';
let googleInitialized = false;

export default function Login() {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const renderGoogleButton = () => {
      if (!window.google || !buttonRef.current) return;
      window.__portfolioGoogleCallback = async ({ credential }) => {
        try {
          const result = await googleLogin(credential);
          navigate(result.user.role === 'admin' ? '/admin' : '/');
        } catch (error) {
          console.error('Connexion Google/API:', error);
          setMessage('La connexion Google a échoué. Vérifiez que Laravel est démarré.');
        }
      };
      if (!googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => window.__portfolioGoogleCallback(response),
        });
        googleInitialized = true;
      }
      buttonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(buttonRef.current, { theme: 'outline', size: 'large', width: 310, text: 'continue_with' });
    };
    if (window.google) renderGoogleButton();
    else window.addEventListener('google-loaded', renderGoogleButton);
    return () => window.removeEventListener('google-loaded', renderGoogleButton);
  }, [navigate]);

  return <main className="login-shell"><section className="login-panel"><ShieldCheck size={38} /><span className="login-kicker">Accès sécurisé</span><h1>Connexion</h1><p>Utilisez votre compte Google pour accéder à votre espace.</p><div ref={buttonRef} className="google-button" /><small>{message}</small></section></main>;
}
