const Joi = require('joi');

const patternSchemas = {
    addPattern: Joi.object().keys({
        pattern_name: Joi.string().required(),
        pattern_theme: Joi.string().required(),
    }),

    modifyPattern: Joi.object().keys({
        pattern_name: Joi.string().optional(),
        pattern_theme: Joi.string().optional(),
    }).min(1),
};

module.exports = { patternSchemas };
