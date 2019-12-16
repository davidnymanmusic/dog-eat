export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888/api/'
    : 'https://dog-eat.herokuapp.com/api/';
