const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
    ADMIN_API_BASE_URL: import.meta.env.VITE_ADMIN_API_BASE_URL || 'http://localhost:8000',
};

export default config;
