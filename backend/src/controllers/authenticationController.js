const { formatResponse } = require("../models/Response");
const { formatError } = require("../models/Error");
const { createToken, verifyTokenExpiration } = require("../utils/token");


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
        if (userData.user_password !== user.user_password || user.user_status === "deleted") {
            return res.status(401).json(formatError(`Invalid credentials`));
        } else {
            const token = createToken(user);
            return res.json(formatResponse({ token, user }));
        }
    }

    async refresh(req, res) {
        const token = req.headers.authorization;
        if (token) {
            const tokenPayload = verifyTokenExpiration(token);
            if (tokenPayload.expired) {
                return res.json(formatResponse(tokenPayload));
            } else {
                let user
                try {
                    user = await this.repository.getUserByEmail(tokenPayload.token.user_email)
                    if (!user) {
                        return res.status(404).json(formatError(`User with email ${userData.user_email} not found`));
                    }
                } catch (err) {
                    return res.status(500).json(formatError(`Error getting user, ${err}`));
                }
                const newToken = createToken({ user_email: user.user_email, user_permissions: user.user_permissions });
                return res.json(formatResponse({ token: newToken, user: user, expired: false }));
            }
        } else {
            res.status(401).json(formatError(`Token is missing`));
        }
    }
}

module.exports = { AuthenticationController };
