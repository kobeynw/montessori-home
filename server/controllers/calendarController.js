const CalendarModel = require('../models/calendarModel');

class CalendarController {
    // Get user's calendar
    static async getCalendar(req, res) {
        try {
            // For MVP, we'll use a hardcoded user ID since we don't have auth yet
            // TODO: Replace with req.user.id once auth is implemented
            const userId = 1;

            const entries = await CalendarModel.getUserCalendar(userId);

            // Group entries by day of week
            const calendar = {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: []
            };

            entries.forEach(entry => {
                calendar[entry.day_of_week].push(entry);
            });

            res.json({
                success: true,
                data: calendar
            });
        } catch (error) {
            console.error('Error fetching calendar:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch calendar',
                message: error.message
            });
        }
    }

    // Add activity to calendar
    static async addActivity(req, res) {
        try {
            const userId = 1; // TODO: Replace with req.user.id
            const { activityId, customActivityName, dayOfWeek } = req.body;

            // Validate input
            if (!dayOfWeek) {
                return res.status(400).json({
                    success: false,
                    error: 'Day of week is required'
                });
            }

            const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            if (!validDays.includes(dayOfWeek)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid day of week'
                });
            }

            // Must have either activityId or customActivityName
            if (!activityId && !customActivityName) {
                return res.status(400).json({
                    success: false,
                    error: 'Either activityId or customActivityName is required'
                });
            }

            // Can't have both
            if (activityId && customActivityName) {
                return res.status(400).json({
                    success: false,
                    error: 'Cannot specify both activityId and customActivityName'
                });
            }

            let entryId;
            if (activityId) {
                entryId = await CalendarModel.addDatabaseActivity(userId, activityId, dayOfWeek);
            } else {
                entryId = await CalendarModel.addCustomActivity(userId, customActivityName, dayOfWeek);
            }

            // Fetch the created entry to return full details
            const entry = await CalendarModel.getById(entryId, userId);

            res.status(201).json({
                success: true,
                data: entry
            });
        } catch (error) {
            console.error('Error adding activity to calendar:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to add activity',
                message: error.message
            });
        }
    }

    // Update calendar entry status
    static async updateStatus(req, res) {
        try {
            const userId = 1; // TODO: Replace with req.user.id
            const { id } = req.params;
            const { status } = req.body;

            // Validate status
            const validStatuses = ['planned', 'completed', 'skipped'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid status. Must be planned, completed, or skipped'
                });
            }

            const updated = await CalendarModel.updateStatus(id, userId, status);

            if (!updated) {
                return res.status(404).json({
                    success: false,
                    error: 'Calendar entry not found'
                });
            }

            // Fetch updated entry
            const entry = await CalendarModel.getById(id, userId);

            res.json({
                success: true,
                data: entry
            });
        } catch (error) {
            console.error('Error updating calendar entry:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update entry',
                message: error.message
            });
        }
    }

    // Delete calendar entry
    static async deleteEntry(req, res) {
        try {
            const userId = 1; // TODO: Replace with req.user.id
            const { id } = req.params;

            const deleted = await CalendarModel.deleteEntry(id, userId);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Calendar entry not found'
                });
            }

            res.json({
                success: true,
                message: 'Entry deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting calendar entry:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete entry',
                message: error.message
            });
        }
    }

    // Clear all calendar entries
    static async clearAll(req, res) {
        try {
            const userId = 1; // TODO: Replace with req.user.id

            const deletedCount = await CalendarModel.clearAllEntries(userId);

            res.json({
                success: true,
                message: `Cleared ${deletedCount} entries`,
                deletedCount
            });
        } catch (error) {
            console.error('Error clearing calendar:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to clear calendar',
                message: error.message
            });
        }
    }
}

module.exports = CalendarController;