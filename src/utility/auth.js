import Cookies from 'js-cookie';

export const logout = async () => {
  Cookies.set("token", null);
  Cookies.set("tokenExist", false);
  Cookies.set("fullname", null);
  Cookies.set("role", null);
  window.location.href = Cookies.get('homeLink') || '/';
};
