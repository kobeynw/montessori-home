import api from './api';

const activityService = {
    // Get activities with filters and pagination
    getActivities: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);
            if (filters.category) params.append('category', filters.category);
            if (filters.age) params.append('age', filters.age);
            if (filters.duration) params.append('duration', filters.duration);
            if (filters.search) params.append('search', filters.search);

            const response = await api.get(`/activities?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching activities:', error);
            throw error;
        }
    },

    // Get single activity by ID
    getActivity: async (id) => {
        try {
            const response = await api.get(`/activities/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching activity:', error);
            throw error;
        }
    },

    // Get all categories
    getCategories: async () => {
        try {
            const response = await api.get('/activities/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};

export default activityService;