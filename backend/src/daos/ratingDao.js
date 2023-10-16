const {Rating} = require("../models/Rating");

class RatingDao {
    constructor(db) {
        this.db = db;
    }

    getAllRatingsByProductId(id, callback) {
        const query = 'SELECT * FROM ratings WHERE product_id = ?';
        this.db.all(query, [id], (err, rows) => {
            if (err) {
                return callback(err);
            }
            const ratings = rows.map(row => new Rating(row.product_id, row.user_id, row.rating_value));
            callback(null, ratings);
        });
    }

    addRating(id, rating, callback) {
        const query = 'INSERT INTO ratings (id, user_id, rating_value) VALUES (?, ?, ?)';
        const values = [rating.product_id, rating.user_id, rating.rating_value];
        this.db.run(query,[id], values, function (err) {
            if (err) {
                return callback(err);
            }
            const productId = rating.product_id;
            callback(null, productId);
        });
    }

    // getPatternById(id, callback) {
    //     const query = 'SELECT pattern_id, pattern_name, pattern_theme FROM patterns WHERE pattern_id = ?';
    //     this.db.get(query, [id], function(err, row) {
    //         if (err) {
    //             return callback(err);
    //         }
    //         callback(null, row);
    //     })
    // }
    //
    // deletePatternById(id, callback) {
    //     const query = `DELETE FROM patterns WHERE pattern_id = ?`;
    //     this.db.run(query, [id], function(err, row) {
    //         if (err) {
    //             return callback(err);
    //         }
    //     })
    //     callback(null, "deleted");
    // }
}

module.exports = {RatingDao};

