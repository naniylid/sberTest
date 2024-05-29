import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'njjv1q',

  e2e: {
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
