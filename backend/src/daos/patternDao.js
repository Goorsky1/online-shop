const {Pattern} = require("../models/Pattern");

class PatternDao {
    constructor(db) {
        this.db = db;
    }

    getAllPatterns(callback) {
        const query = 'SELECT * FROM patterns';
        this.db.all(query, (err, rows) => {
            if (err) {
                return callback(err);
            }
            const patterns = rows.map(row => new Pattern(row.pattern_id, row.pattern_name, row.pattern_theme));
            callback(null, patterns);
        });
    }

    addPattern(pattern, callback) {
        const query = 'INSERT INTO patterns (pattern_name, pattern_theme) VALUES (?, ?)';
        const values = [pattern.pattern_name, pattern.pattern_theme];
        this.db.run(query, values, function (err) {
            if (err) {
                return callback(err);
            }
            const newPatternId = this.lastID;
            callback(null, newPatternId);
        });
    }

    getPatternById(id, callback) {
        const query = 'SELECT pattern_id, pattern_name, pattern_theme FROM patterns WHERE pattern_id = ?';
        this.db.get(query, [id], function(err, row) {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        })
    }

    deletePatternById(id, callback) {
        const query = `DELETE FROM patterns WHERE pattern_id = ?`;
        this.db.run(query, [id], function(err, row) {
            if (err) {
                return callback(err);
            }
        })
        callback(null, "deleted");
    }

    modifyPattern(patternId, updatedPattern, callback) {
        const query = `
        UPDATE patterns 
        SET 
            pattern_name = ?, 
            pattern_theme = ?
        WHERE pattern_id = ?
    `;

        const values = [
            updatedPattern.pattern_name,
            updatedPattern.pattern_theme,
            patternId
        ];

        this.db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, "Pattern Updated");
        });
    }
}

module.exports = {PatternDao};

