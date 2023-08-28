const isUserLoggedIn = () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) return true
    else return false;
    return accessToken !== null;
};

export default isUserLoggedIn;
