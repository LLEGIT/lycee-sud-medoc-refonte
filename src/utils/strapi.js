const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

const headers = {
  'Content-Type': 'application/json',
};

if (STRAPI_TOKEN) {
  headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
}

export async function fetchAPI(path, options = {}) {
  const mergedOptions = {
    headers,
    ...options,
  };

  const requestUrl = `${STRAPI_URL}/api${path}`;
  console.log('Fetching:', requestUrl);
  console.log('Headers:', headers);
  
  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export function getStrapiURL(path = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(media) {
  if (!media) return null;
  
  const { url } = media;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
