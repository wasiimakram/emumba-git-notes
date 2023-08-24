// axiosInstance.js

import axios from 'axios';

const ax = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the access token in requests
ax.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default ax;
