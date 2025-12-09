// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://LLEGIT.github.io',
  base: '/lycee-sud-medoc-refonte',
  vite: {
    plugins: [tailwindcss()],
  },
});
