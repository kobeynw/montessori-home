import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = authService.getToken();
        
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authService.verifyToken();
            setUser(response.user);
            setIsAuthenticated(true);
        } catch (error) {
            // Token is invalid or expired
            if (error.expired) {
                alert('Your session has expired. Please login again.');
            }
            authService.removeToken();
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        authService.setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
    };

    const register = async (email, password, firstName, lastName) => {
        const response = await authService.register(email, password, firstName, lastName);
        authService.setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
    };

    const logout = () => {
        authService.removeToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};