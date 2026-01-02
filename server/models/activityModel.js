const db = require('../config/database');

class ActivityModel {
    // Get activities with filters and pagination
    static async getAll(filters = {}) {
        const {
            page = 1,
            limit = 10,
            category = '',
            age = '',
            duration = '',
            search = ''
        } = filters;

        // Parse to integers
        const pageInt = parseInt(page);
        const limitInt = parseInt(limit);

        // Calculate offset for pagination
        const offset = (pageInt - 1) * limitInt;

        // Build the WHERE clause based on filters
        let whereConditions = [];
        let queryParams = [];

        // Category filter
        if (category && category !== 'All') {
            whereConditions.push('category = ?');
            queryParams.push(category);
        }

        // Age filter (age_min <= selected age)
        if (age) {
            const ageValue = parseInt(age.replace('+', ''));
            whereConditions.push('age_min <= ?');
            queryParams.push(ageValue);
        }

        // Duration filter
        if (duration) {
            if (duration === '0-15') {
                whereConditions.push('duration <= 15');
            } else if (duration === '15-30') {
                whereConditions.push('duration > 15 AND duration <= 30');
            } else if (duration === '30+') {
                whereConditions.push('duration > 30');
            }
        }

        // Search filter (title or description)
        if (search) {
            whereConditions.push('(title LIKE ? OR description LIKE ?)');
            const searchTerm = `%${search}%`;
            queryParams.push(searchTerm, searchTerm);
        }

        // Build the WHERE clause
        const whereClause = whereConditions.length > 0 
            ? 'WHERE ' + whereConditions.join(' AND ')
            : '';

        // Get total count for pagination
        const countQuery = `SELECT COUNT(*) as total FROM activities ${whereClause}`;
        const [countResult] = await db.query(countQuery, queryParams);
        const total = countResult[0].total;

        // Get paginated activities
        const dataQuery = `
            SELECT * FROM activities 
            ${whereClause}
            ORDER BY title ASC
            LIMIT ? OFFSET ?
        `;
        const [activities] = await db.query(dataQuery, [...queryParams, limitInt, offset]);

        return {
            activities,
            pagination: {
                page: pageInt,
                limit: limitInt,
                total,
                totalPages: Math.ceil(total / limitInt)
            }
        };
    }

    // Get single activity by ID
    static async getById(id) {
        const query = 'SELECT * FROM activities WHERE id = ?';
        const [activities] = await db.query(query, [id]);
        return activities[0] || null;
    }

    // Get all unique categories
    static async getCategories() {
        const query = 'SELECT DISTINCT category FROM activities ORDER BY category';
        const [categories] = await db.query(query);
        return categories.map(row => row.category);
    }
}

module.exports = ActivityModel;