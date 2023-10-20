const { Rating } = require("../models/Rating");

class RatingRepository {
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
        const userId = rating.user_id;
        const ratingValue = rating.rating_value;
        const query = 'INSERT INTO ratings (product_id, user_id, rating_value) VALUES (?, ?, ?)';
        const values = [productId, userId, ratingValue];

        this.db.run(query, values, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, new Rating(productId, rating.userId, ratingValue));
        });
    }

    getRatingByUserIdAndProductId(userId, productId, callback) {
        const query = "SELECT * FROM ratings WHERE user_id = ? AND product_id = ?";

        this.db.get(query, [userId, productId], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, new Rating(row.product_id, row.user_id, row.rating_value));
            }
        });
    }

    deleteRating(userId, productId, callback) {
        const query = "DELETE FROM ratings WHERE user_id = ? AND product_id = ?";

        this.db.run(query, [userId, productId], function (err, row) {
            if (err) {
                return callback(err);
            }
            callback(null);
        })
    }

    modifyRating(productId, rating, callback) {
        const userId = rating.user_id;
        const ratingValue = rating.rating_value;
        const query = "UPDATE ratings SET rating_value = ? WHERE user_id = ? AND product_id = ?";
        const values = [ratingValue, userId, productId];

        this.db.run(query, values, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, new Rating(productId, userId, ratingValue));
        });
    }
}

module.exports = { RatingRepository };

