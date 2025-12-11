import { fetchAPI, getStrapiMedia } from './strapi.js';

// Global media cache
let mediaCache = null;
let strapiAvailable = false;

export async function getMediaCollection() {
  if (mediaCache) {
    return { media: mediaCache, available: strapiAvailable };
  }

  try {
    const imagesResponse = await fetchAPI('/upload/files');
    const images = imagesResponse;
    strapiAvailable = true;
    
    mediaCache = {
      logo: images.find(img => img.name.toLowerCase().includes('logo')),
      onisep: images.find(img => img.name.toLowerCase().includes('onisep')),
      horizons21: images.find(img => img.name.toLowerCase().includes('horizons21')),
      
      heroBanner: images.find(img => img.name.toLowerCase().includes('hero-banner')),
      heroOrientation: images.find(img => img.name.toLowerCase().includes('hero-orientation') || img.name.toLowerCase().includes('orientation-hero')),
      
      lyceeFacade: images.find(img => img.name.toLowerCase().includes('lycee-facade')),
      courLycee: images.find(img => img.name.toLowerCase().includes('cour-lycee')),
      
      elevesAction: images.find(img => img.name.toLowerCase().includes('eleves-action')),
      salleDeClasse: images.find(img => img.name.toLowerCase().includes('salle-de-classe')),
      cdi: images.find(img => img.name.toLowerCase().includes('cdi')),
      labo: images.find(img => img.name.toLowerCase().includes('labo')),
    };
    
    return { media: mediaCache, available: strapiAvailable };
  } catch (error) {
    strapiAvailable = false;
    mediaCache = {};
    return { media: mediaCache, available: strapiAvailable };
  }
}

export function getImageUrl(imageName, fallbackPath) {
  if (!mediaCache || !strapiAvailable || !mediaCache[imageName]) {
    return fallbackPath;
  }
  return getStrapiMedia(mediaCache[imageName]);
}

// Reset cache (useful for development)
export function resetMediaCache() {
  mediaCache = null;
  strapiAvailable = false;
}
