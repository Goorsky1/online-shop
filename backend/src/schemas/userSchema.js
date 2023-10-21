const Joi = require('joi');

const userSchemas = {
    addUser: Joi.object().keys({
        user_email: Joi.string().email().required(),
        user_password: Joi.string().min(5).required(),
        user_status: Joi.string().valid('active', 'deleted').required(),
        user_phone: Joi.string().pattern(/^[0-9]{9}$/).required(),
        user_permissions: Joi.string().valid('client', 'admin').required(),
    }),

    modifyUser: Joi.object().keys({
        user_email: Joi.string().email().optional(),
        user_password: Joi.string().min(5).optional(),
        user_status: Joi.string().valid('active', 'deleted').optional(),
        user_phone: Joi.string().pattern(/^[0-9]{9}$/).optional(),
        user_permissions: Joi.string().valid('client', 'admin').optional(),
    }).min(1),

};

module.exports = { userSchemas };