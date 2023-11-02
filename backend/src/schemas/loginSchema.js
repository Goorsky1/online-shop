const Joi = require('joi');

const loginSchema = {
    login: Joi.object().keys({
        user_email: Joi.string().required(),
        user_password: Joi.string().required(),
    }),
};

module.exports = { loginSchema };
