const { formatError } = require("../models/Error");
const { createToken, verifyToken } = require("../utils/token");

function createAuthMiddleware(db) {
    return function Authenticate(req, res, next) {
        const token = req.headers.authorization;

        if (token) {
            const tokenPayload = verifyToken(token);
            if (tokenPayload) {
                let user
                try {
                    user = db.getUserByEmail(tokenPayload.user_email)
                    if (!user) {
                        return res.status(404).json(formatError(`User with email ${userData.user_email} not found`));
                    }
                } catch (err) {
                    return res.status(500).json(formatError(`Error getting user, ${err}`));
                }
                const newToken = createToken({ user_email: user.user_email, user_permissions: user.user_permissions });
                res.set('Authorization', newToken);
                req.user = tokenPayload;
                next();
            } else {
                res.status(403).json(formatError(`Token is invalid or expired`));
            }
        } else {
            res.status(401).json(formatError(`Token is missing`));
        }
    };
}

module.exports = { createAuthMiddleware };

