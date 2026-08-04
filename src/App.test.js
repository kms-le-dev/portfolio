import { render } from '@testing-library/react';
import App from './App';

test('applique la langue par défaut de lapplication en français', () => {
  render(<App />);

  expect(document.documentElement.lang).toBe('fr');
});
