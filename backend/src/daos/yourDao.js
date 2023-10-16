const sqlite3 = require('sqlite3').verbose();

class YourDao {
    constructor(db) {
        this.db = db;
    }
    // insertData(data) {
    //     const stmt = this.db.prepare('INSERT INTO table (name) VALUES (x)');
    //     stmt.run(data.name);
    //     stmt.finalize();
    // }
    getAllData(callback) {
        this.db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
}

const dao = new YourDao(db);
