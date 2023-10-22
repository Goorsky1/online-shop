const Joi = require('joi');

const productSchemas = {
    addProduct: Joi.object().keys({
        product_name: Joi.string().required(),
        product_color: Joi.string().required(),
        product_material: Joi.string().required(),
        product_diameter: Joi.number().required(),
        product_width: Joi.number().required(),
        pattern_id: Joi.number().integer().required(),
        product_count: Joi.number().integer().required(),
        product_price: Joi.number().required(),
        product_description: Joi.string().required(),
        product_image: Joi.string().optional(),
    }),

    modifyProduct: Joi.object().keys({
        product_name: Joi.string().optional(),
        product_color: Joi.string().optional(),
        product_material: Joi.string().optional(),
        product_diameter: Joi.number().optional(),
        product_width: Joi.number().optional(),
        pattern_id: Joi.number().integer().optional(),
        product_count: Joi.number().integer().optional(),
        product_price: Joi.number().optional(),
        product_description: Joi.string().optional(),
        product_image: Joi.string().optional(),
    }).min(1),
};

module.exports = { productSchemas };
