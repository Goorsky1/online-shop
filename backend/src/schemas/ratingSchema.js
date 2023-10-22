const Joi = require('joi');

const ratingSchemas = {
    addRating: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        rating_value: Joi.number().integer().min(1).max(5).required(),
    }),

    modifyRating: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        rating_value: Joi.number().integer().min(1).max(5).required(),
    }),
};

module.exports = { ratingSchemas };
