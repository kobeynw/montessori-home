import api from './api';

const calendarService = {
    // Get user's calendar
    getCalendar: async () => {
        try {
            const response = await api.get('/calendar');
            return response.data;
        } catch (error) {
            console.error('Error fetching calendar:', error);
            throw error;
        }
    },

    // Add database activity to calendar
    addDatabaseActivity: async (activityId, dayOfWeek) => {
        try {
            const response = await api.post('/calendar', {
                activityId,
                dayOfWeek
            });
            return response.data;
        } catch (error) {
            console.error('Error adding database activity:', error);
            throw error;
        }
    },

    // Add custom activity to calendar
    addCustomActivity: async (customActivityName, dayOfWeek) => {
        try {
            const response = await api.post('/calendar', {
                customActivityName,
                dayOfWeek
            });
            return response.data;
        } catch (error) {
            console.error('Error adding custom activity:', error);
            throw error;
        }
    },

    // Update calendar entry status
    updateStatus: async (entryId, status) => {
        try {
            const response = await api.put(`/calendar/${entryId}/status`, {
                status
            });
            return response.data;
        } catch (error) {
            console.error('Error updating status:', error);
            throw error;
        }
    },

    // Delete calendar entry
    deleteEntry: async (entryId) => {
        try {
            const response = await api.delete(`/calendar/${entryId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting entry:', error);
            throw error;
        }
    },

    // Clear all calendar entries
    clearAll: async () => {
        try {
            const response = await api.delete('/calendar');
            return response.data;
        } catch (error) {
            console.error('Error clearing calendar:', error);
            throw error;
        }
    }
};

export default calendarService;