import Cookies from 'js-cookie';

// A CSRF token lekérése
export const getCSRFToken = () => {
  return Cookies.get('csrftoken');
};
