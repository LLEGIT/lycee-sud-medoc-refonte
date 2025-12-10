// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://LLEGIT.github.io',
  base: '/lycee-sud-medoc-refonte',
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.STRAPI_URL': JSON.stringify(process.env.STRAPI_URL || ''),
      'import.meta.env.STRAPI_TOKEN': JSON.stringify(process.env.STRAPI_TOKEN || ''),
    }
  },
});
