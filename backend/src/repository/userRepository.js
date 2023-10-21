const { User } = require("../models/User");

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT user_id, user_email, user_status, user_phone, user_permissions FROM users';
            this.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const users = rows.map(row => new User(row.user_id, row.user_email, row.user_password, row.user_status, row.user_phone, row.user_permissions));
                    resolve(users);
                }
            });
        });
    }

    async addUser(user) {
        const query = 'INSERT INTO users (user_email, user_password, user_status, user_phone, user_permissions) VALUES (?, ?, ?, ?, ?)';
        const values = [user.user_email, user.user_password, user.user_status, user.user_phone, user.user_permissions];

        try {
            const { lastID } = await new Promise((resolve, reject) => {
                this.db.run(query, values, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this);
                    }
                });
            });

            return new User(lastID, user.user_email, user.user_password, user.user_status, user.user_phone, user.user_permissions);
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT user_id, user_email, user_password, user_status, user_phone, user_permissions FROM users WHERE user_id = ?';
            this.db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(null);
                } else {
                    resolve(new User(row.user_id, row.user_email, row.user_password, row.user_status, row.user_phone, row.user_permissions));
                }
            });
        });
    }

    async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT user_id, user_email, user_status, user_phone, user_permissions FROM users WHERE user_email = ?';
            this.db.get(query, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(null);
                } else {
                    resolve(new User(row.user_id, row.user_email, row.user_password, row.user_status, row.user_phone, row.user_permissions));
                }
            });
        });
    }

    async deleteUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE user_id = ?';
            this.db.run(query, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async modifyUser(id, user) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET user_email = ?, user_password = ?, user_status = ?, user_phone = ?, user_permissions = ? WHERE user_id = ?';
            const values = [user.user_email, user.user_password, user.user_status, user.user_phone, user.user_permissions, id];
            this.db.run(query, values, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new User(id, user.user_email, user.user_password, user.user_status, user.user_phone, user.user_permissions));
                }
            });
        });
    }
}

module.exports = { UserRepository };
