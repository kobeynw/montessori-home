import api from './api';

const authService = {
    // Register new user
    register: async (email, password, firstName, lastName) => {
        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                firstName,
                lastName
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Login user
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Verify token
    verifyToken: async () => {
        try {
            const response = await api.get('/auth/verify');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Store token in localStorage
    setToken: (token) => {
        localStorage.setItem('token', token);
    },

    // Get token from localStorage
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Remove token from localStorage
    removeToken: () => {
        localStorage.removeItem('token');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;