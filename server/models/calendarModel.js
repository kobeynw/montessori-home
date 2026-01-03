const db = require('../config/database');

class CalendarModel {
    // Get all calendar entries for a user
    static async getUserCalendar(userId) {
        const query = `
            SELECT 
                ce.id,
                ce.user_id,
                ce.activity_id,
                ce.custom_activity_name,
                ce.day_of_week,
                ce.status,
                ce.created_at,
                ce.updated_at,
                COALESCE(a.title, ce.custom_activity_name) as activity_title,
                a.category,
                a.duration,
                a.age_min,
                CASE WHEN ce.activity_id IS NOT NULL THEN 'database' ELSE 'custom' END as activity_type
            FROM calendar_entries ce
            LEFT JOIN activities a ON ce.activity_id = a.id
            WHERE ce.user_id = ?
            ORDER BY FIELD(ce.day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        `;
        
        const [entries] = await db.query(query, [userId]);
        return entries;
    }

    // Add a calendar entry (database activity)
    static async addDatabaseActivity(userId, activityId, dayOfWeek) {
        const query = `
            INSERT INTO calendar_entries (user_id, activity_id, day_of_week, status)
            VALUES (?, ?, ?, 'planned')
        `;
        
        const [result] = await db.query(query, [userId, activityId, dayOfWeek]);
        return result.insertId;
    }

    // Add a calendar entry (custom activity)
    static async addCustomActivity(userId, customActivityName, dayOfWeek) {
        const query = `
            INSERT INTO calendar_entries (user_id, custom_activity_name, day_of_week, status)
            VALUES (?, ?, ?, 'planned')
        `;
        
        const [result] = await db.query(query, [userId, customActivityName, dayOfWeek]);
        return result.insertId;
    }

    // Update calendar entry status
    static async updateStatus(entryId, userId, status) {
        const query = `
            UPDATE calendar_entries 
            SET status = ?
            WHERE id = ? AND user_id = ?
        `;
        
        const [result] = await db.query(query, [status, entryId, userId]);
        return result.affectedRows > 0;
    }

    // Delete a calendar entry
    static async deleteEntry(entryId, userId) {
        const query = `
            DELETE FROM calendar_entries 
            WHERE id = ? AND user_id = ?
        `;
        
        const [result] = await db.query(query, [entryId, userId]);
        return result.affectedRows > 0;
    }

    // Clear all entries for a user
    static async clearAllEntries(userId) {
        const query = `
            DELETE FROM calendar_entries 
            WHERE user_id = ?
        `;
        
        const [result] = await db.query(query, [userId]);
        return result.affectedRows;
    }

    // Get single entry by ID
    static async getById(entryId, userId) {
        const query = `
            SELECT 
                ce.*,
                COALESCE(a.title, ce.custom_activity_name) as activity_title,
                a.category,
                a.duration
            FROM calendar_entries ce
            LEFT JOIN activities a ON ce.activity_id = a.id
            WHERE ce.id = ? AND ce.user_id = ?
        `;
        
        const [entries] = await db.query(query, [entryId, userId]);
        return entries[0] || null;
    }
}

module.exports = CalendarModel;