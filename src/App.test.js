import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('applique la langue par défaut de lapplication en français', () => {
  render(<App />);

  expect(document.documentElement.lang).toBe('fr');
});

test('garde un seul titre principal et filtre les projets par catégorie', () => {
  const { container } = render(<App />);

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(container.querySelectorAll('.project-card')).toHaveLength(6);

  fireEvent.click(screen.getByRole('button', { name: 'Mobile' }));

  expect(container.querySelectorAll('.project-card')).toHaveLength(4);
  expect(screen.getByRole('status')).toHaveTextContent('4 projets affichés');
  expect(screen.getByRole('button', { name: 'Mobile' })).toHaveAttribute('aria-pressed', 'true');

  fireEvent.click(screen.getByRole('button', { name: 'Tous' }));
  expect(container.querySelectorAll('.project-card')).toHaveLength(6);

  fireEvent.click(screen.getByRole('link', { name: 'Voir tous les projets' }));
  expect(container.querySelectorAll('.project-card')).toHaveLength(25);
});
