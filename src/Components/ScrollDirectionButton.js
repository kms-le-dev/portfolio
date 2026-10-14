import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import './ScrollDirectionButton.css';

export default function ScrollDirectionButton() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    let animationFrame = null;

    const updateDirection = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        setShowScrollUp(window.scrollY > 280);
        animationFrame = null;
      });
    };

    updateDirection();
    window.addEventListener('scroll', updateDirection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateDirection);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleClick = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (showScrollUp) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }

    window.scrollBy({
      top: Math.max(window.innerHeight * 0.75, 400),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const Icon = showScrollUp ? ArrowUp : ArrowDown;

  return (
    <button
      type="button"
      className={`scroll-direction-button${showScrollUp ? ' is-up' : ' is-down'}`}
      onClick={handleClick}
      aria-label={showScrollUp ? 'Remonter en haut de page' : 'Défiler vers le bas'}
      title={showScrollUp ? 'Remonter en haut' : 'Défiler vers le bas'}
    >
      <Icon size={21} aria-hidden="true" />
    </button>
  );
}
