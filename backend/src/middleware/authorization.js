const { formatError } = require("../models/Error");

function createAuthorizationMiddleware(authorizedUsers) {
    return function Authorize(req, res, next) {
        const tokenPayload = req.user;

        if (tokenPayload) {
            const isAuthorized = authorizedUsers.some(authorizedUser => {
                return authorizedUser === tokenPayload.user_permissions;
            });

            if (isAuthorized) {
                next();
            } else {
                res.status(403).json(formatError(`You are not authorized to access this resource`));
            }
        } else {
            res.status(401).json(formatError(`Token is missing or invalid`));
        }
    };
}

module.exports = { createAuthorizationMiddleware };