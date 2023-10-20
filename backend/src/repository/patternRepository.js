const { Pattern } = require("../models/Pattern");

class PatternRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllPatterns() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM patterns';
            this.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const patterns = rows.map(row => new Pattern(row.pattern_id, row.pattern_name, row.pattern_theme));
                    resolve(patterns);
                }
            });
        });
    }

    async addPattern(pattern) {
        const query = 'INSERT INTO patterns (pattern_name, pattern_theme) VALUES (?, ?)';
        const values = [pattern.pattern_name, pattern.pattern_theme];

        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Pattern(this.lastId, pattern.pattern_name, pattern.pattern_theme));
                }
            });
        });
    }

    async getPatternById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT pattern_id, pattern_name, pattern_theme FROM patterns WHERE pattern_id = ?';
            this.db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(new Pattern(row.pattern_id, row.pattern_name, row.pattern_theme));
                } else {
                    resolve()
                }
            });
        });
    }

    async deletePatternById(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM patterns WHERE pattern_id = ?`;
            this.db.run(query, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async modifyPattern(patternId, updatedPattern) {
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

        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Pattern(patternId, updatedPattern.pattern_name, updatedPattern.pattern_theme));
                }
            });
        });
    }
}

module.exports = { PatternRepository };
