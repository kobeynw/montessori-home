const ActivityModel = require('../models/activityModel');

class ActivityController {
    // Get all activities with filters
    static async getActivities(req, res) {
        try {
            const filters = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                category: req.query.category || '',
                age: req.query.age || '',
                duration: req.query.duration || '',
                search: req.query.search || ''
            };

            const result = await ActivityModel.getAll(filters);

            res.json({
                success: true,
                data: result.activities,
                pagination: result.pagination
            });
        } catch (error) {
            console.error('Error fetching activities:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activities',
                message: error.message
            });
        }
    }

    // Get single activity by ID
    static async getActivity(req, res) {
        try {
            const { id } = req.params;
            const activity = await ActivityModel.getById(id);

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    error: 'Activity not found'
                });
            }

            res.json({
                success: true,
                data: activity
            });
        } catch (error) {
            console.error('Error fetching activity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activity',
                message: error.message
            });
        }
    }

    // Get all categories
    static async getCategories(req, res) {
        try {
            const categories = await ActivityModel.getCategories();
            
            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch categories',
                message: error.message
            });
        }
    }
}

module.exports = ActivityController;