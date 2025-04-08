export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};
