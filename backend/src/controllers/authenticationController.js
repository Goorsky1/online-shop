const { formatResponse } = require("../models/Response");
const { formatError } = require("../models/Error");
const { createToken } = require("../utils/token");

class AuthenticationController {
    constructor(repository) {
        this.repository = repository;
    }

    async login(req, res) {
        const userData = req.body;
        let user;
        try {
            user = await this.repository.getUserByEmail(userData.user_email);
            if (!user) {
                return res.status(404).json(formatError(`User with email ${userData.user_email} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error retrieving data, ${err}`));
        }

        if (userData.user_password === user.user_password) {
            const token = createToken(user);
            return res.json(formatResponse({ token, user }));
        } else {
            return res.status(401).json(formatError(`Invalid credentials`));
        }
    }
}

module.exports = { AuthenticationController };
