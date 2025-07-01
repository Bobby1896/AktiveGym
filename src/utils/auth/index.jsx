export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken();

export const logoutAndRedirect = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
