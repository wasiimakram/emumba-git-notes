// axiosInstance.js

import axios from 'axios';

const ax = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
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
