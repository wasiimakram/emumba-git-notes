const isUserLoggedIn = () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) return true;
  return false;
  // return accessToken !== null;
};

export default isUserLoggedIn;
