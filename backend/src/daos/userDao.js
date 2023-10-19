const { User } = require("../models/User");

class UserDao {
    constructor(db) {
        this.db = db;
    }

    getAllUsers(callback) {
        const query = 'SELECT user_id, user_email, user_status, user_phone, user_permissions FROM users';
        this.db.all(query, (err, rows) => {
            if (err) {
                return callback(err);
            }
            const users = rows.map(row => new User(row.user_id, row.user_email, row.user_password, row.user_status, row.user_phone, row.user_permissions));
            callback(null, users);
        });
    }

    addUser(user, callback) {
        const query = 'INSERT INTO users (user_email, user_password, user_status, user_phone, user_permissions) VALUES (?, ?, ?, ?, ?)';
        const values = [user.user_email, user.user_password, user.user_status, user.user_phone, user.user_permissions];
        this.db.run(query, values, function (err) {
            if (err) {
                return callback(err);
            }
            const newUserId = this.lastID;
            callback(null, newUserId);
        });
    }

    getUserById(id, callback) {
        const query = 'SELECT user_id, user_email, user_status, user_phone, user_permissions FROM users WHERE user_id = ?';
        console.log("query:", query)
        console.log("id:", id)
        this.db.get(query, [id], function (err, row) {
            if (err) {
                return callback(err);
            }
            // console.log("row:", row);
            callback(null, row);
        })
    }

    deleteUserById(id, callback) {
        const query = `DELETE FROM users WHERE user_id = ?`;
        this.db.run(query, [id], function (err, row) {
            if (err) {
                return callback(err);
            }
            console.log("row:", row);
            callback(null, "deleted");
        })
    }
    modifyUser(id, user, callback) {
        const query = 'UPDATE users SET user_email = ?, user_password = ?, user_status = ?, user_phone = ?, user_permissions = ? WHERE user_id = ?';
        const values = [user.user_email, user.user_password, user.user_status, user.user_phone, user.user_permissions, id];
        this.db.run(query, values, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, user.user_id);  // Return the ID of the modified user
        });
    }

}

module.exports = { UserDao };

