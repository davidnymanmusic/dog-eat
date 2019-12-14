export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/'
    : 'https://dogeat.netlify.com/api/';
