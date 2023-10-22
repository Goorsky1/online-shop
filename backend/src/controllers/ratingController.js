const { formatResponse } = require("../models/Response");
const { formatError } = require("../models/Error");

class RatingController {
    constructor(ratingRepository, userRepository, productRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    async getAllRatingsByProductId(req, res) {
        const id = req.params.id;

        try {
            const ratings = await this.ratingRepository.getAllRatingsByProductId(id);
            res.json(formatResponse({ ratings }));
        } catch (err) {
            res.status(500).json(formatError("Error retrieving data"));
        }
    }

    async addRating(req, res) {
        const productId = req.params.id;
        const ratingData = req.body;

        try {
            const user = await this.userRepository.getUserById(ratingData.user_id);
            if (!user) {
                return res.status(404).json(formatError(`Error adding a new rating, user ${ratingData.user_id} does not exist`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error adding a new rating, ${err}`));
        }

        try {
            const product = await this.productRepository.getProductById(productId);
            if (!product) {
                return res.status(404).json(formatError(`Error adding a new rating, product ${productId} does not exist`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error adding a new rating, ${err}`));
        }

        try {
            const existingRating = await this.ratingRepository.getRatingByUserIdAndProductId(ratingData.user_id, productId);
            if (existingRating) {
                res.status(409).json(formatError("Rating already exists for this user and product"));
            } else {
                const rating = await this.ratingRepository.addRating(productId, ratingData);
                res.status(201).json(formatResponse({ rating }));
            }
        } catch (err) {
            res.status(500).json(formatError("Error adding a new rating"));
        }
    }

    async getRatingByUserIdAndProductId(req, res) {
        const userId = req.params.idu;
        const productId = req.params.idp;

        try {
            const rating = await this.ratingRepository.getRatingByUserIdAndProductId(userId, productId);
            if (rating) {
                res.json(formatResponse({ rating }));
            } else {
                res.status(404).json(formatError("Rating not found"));
            }
        } catch (err) {
            res.status(500).json(formatError("Error fetching rating"));
        }
    }

    async deleteRating(req, res) {
        const userId = req.params.idu;
        const productId = req.params.idp;

        try {
            const rating = await this.ratingRepository.getRatingByUserIdAndProductId(userId, productId);
            if (!rating) {
                res.status(404).json(formatError("Rating not found"));
            } else {
                await this.ratingRepository.deleteRating(userId, productId);
                res.sendStatus(204);
            }
        } catch (err) {
            res.status(500).json(formatError("Error deleting rating"));
        }
    }

    async modifyRating(req, res) {
        const productId = req.params.id;
        let ratingData = req.body
        try {
            const rating = await this.ratingRepository.getRatingByUserIdAndProductId(ratingData.user_id, productId);
            if (!rating) {
                return res.status(404).json(formatError("Rating not found"));
            } else {
                const parsedRating = JSON.parse(JSON.stringify(rating)) //get rid of underscores from model
                ratingData = { ...rating, ...req.body };
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error modifying rating, err: ${err}`));
        }

        try {
            const user = await this.userRepository.getUserById(ratingData.user_id);
            if (!user) {
                return res.status(404).json(formatError(`Error modifying rating, user ${ratingData.user_id} does not exist`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error modifying rating, ${err}`));
        }

        try {
            const product = await this.productRepository.getProductById(productId);
            if (!product) {
                return res.status(404).json(formatError(`Error modifying rating, product ${productId} does not exist`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error modifying rating, ${err}`));
        }

        try {
            const modifiedRating = await this.ratingRepository.modifyRating(productId, { ...ratingData });
            return res.status(200).json(formatResponse({ rating: modifiedRating }));
        } catch (err) {
            return res.status(500).json(formatError("Error modifying rating"));
        }
    }
}

module.exports = { RatingController };
