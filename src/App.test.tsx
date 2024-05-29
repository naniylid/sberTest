import { render } from './utils/test-utils';
import { describe, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('проверка доступности текста vite и реагирования', () => {
    render(<App />);
  });
});
