const { Rating } = require("../models/Rating");

class RatingRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllRatingsByProductId(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ratings WHERE product_id = ?';
            this.db.all(query, [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const ratings = rows.map(row => new Rating(row.product_id, row.user_id, row.rating_value));
                    resolve(ratings);
                }
            });
        });
    }

    async addRating(productId, rating) {
        const userId = rating.user_id;
        const ratingValue = rating.rating_value;
        const query = 'INSERT INTO ratings (product_id, user_id, rating_value) VALUES (?, ?, ?)';
        const values = [productId, userId, ratingValue];

        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Rating(productId, userId, ratingValue));
                }
            });
        });
    }

    async getRatingByUserIdAndProductId(userId, productId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM ratings WHERE user_id = ? AND product_id = ?";
            this.db.get(query, [userId, productId], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(new Rating(row.product_id, row.user_id, row.rating_value));
                } else {
                    resolve(null);
                }
            });
        });
    }

    async deleteRating(userId, productId) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM ratings WHERE user_id = ? AND product_id = ?";
            this.db.run(query, [userId, productId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async modifyRating(productId, rating) {
        const userId = rating.user_id;
        const ratingValue = rating.rating_value;
        const query = "UPDATE ratings SET rating_value = ? WHERE user_id = ? AND product_id = ?";
        const values = [ratingValue, userId, productId];

        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Rating(productId, userId, ratingValue));
                }
            });
        });
    }
}

module.exports = { RatingRepository };
