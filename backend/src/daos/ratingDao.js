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

    addRating(productId, rating, callback) {
        const userId = rating._user_id;
        const ratingValue = rating._rating_value;
        console.log('Using values:', productId, userId, ratingValue);
        const query = 'INSERT INTO ratings (product_id, user_id, rating_value) VALUES (?, ?, ?)';
        const values = [productId, userId, ratingValue];

        this.db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, productId);
        });
    }

    getRatingByUserIdAndProductId(userId, productId, callback) {
        const query = "SELECT * FROM ratings WHERE user_id = ? AND product_id = ?";

        this.db.get(query, [userId, productId], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    deleteRating(userId, productId, callback) {
        const query = "DELETE FROM ratings WHERE user_id = ? AND product_id = ?";

        this.db.run(query, [userId, productId],function(err, row) {
            if (err) {
                return callback(err);
            }
            console.log("row:", row);
            callback(null, "deleted");
        })
    }

    modifyRating(productId, rating, callback) {
        const userId = rating._user_id;
        const ratingValue = rating._rating_value;

        console.log('Using values:', productId, userId, ratingValue);

        const query = "UPDATE ratings SET rating_value = ? WHERE user_id = ? AND product_id = ?";
        const values = [ratingValue, userId, productId];  // Adjusted the order here

        this.db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, productId);
        });
    }
}

module.exports = {RatingDao};

