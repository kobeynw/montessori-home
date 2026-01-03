const db = require('../config/database');
const bcrypt = require('bcrypt');

class AuthModel {
    // Create a new user
    static async createUser(email, password, firstName, lastName) {
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO users (email, password_hash, first_name, last_name)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [email, passwordHash, firstName, lastName]);
        return result.insertId;
    }

    // Find user by email
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.query(query, [email]);
        return users[0] || null;
    }

    // Find user by ID
    static async findById(id) {
        const query = 'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?';
        const [users] = await db.query(query, [id]);
        return users[0] || null;
    }

    // Verify password
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Check if email exists
    static async emailExists(email) {
        const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
        const [result] = await db.query(query, [email]);
        return result[0].count > 0;
    }
}

module.exports = AuthModel;