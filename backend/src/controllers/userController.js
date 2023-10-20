const { formatResponse } = require("../models/Response");
const { formatError } = require("../models/Error");

class UserController {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.repository.getAllUsers();
            return res.json(formatResponse({ users }));
        } catch (err) {
            return res.status(500).json(formatError(`Error retrieving data, ${err}`));
        }
    }

    async addUser(req, res) {
        const userData = req.body;
        try {
            const existingUser = await this.repository.getUserByEmail(userData.user_email)
            if (existingUser) {
                return res.status(409).json(formatError(`User with email ${userData.user_email} already exists`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error adding new user, ${err}`));
        }

        try {
            const newUser = await this.repository.addUser(userData);
            return res.status(201).json(formatResponse({ "user": newUser }));
        } catch (err) {
            return res.status(500).json(formatError(`Error adding new user, ${err}`));
        }
    }

    async getUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await this.repository.getUserById(id);
            if (user) {
                return res.status(200).json(formatResponse({ user }));
            } else {
                return res.status(404).json(formatError(`User with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting user by id, ${err}`));
        }
    }

    async deleteUserById(req, res) {
        const id = req.params.id;
        try {
            const user = await this.repository.getUserById(id);
            if (!user) {
                return res.status(404).json(formatError(`User with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting user by id, ${err}`));
        }

        try {
            await this.repository.deleteUserById(id);
            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).json(formatError(`Error deleting user by id, ${err}`));
        }
    }

    async modifyUser(req, res) {
        const userData = req.body;
        const id = req.params.id;

        try {
            const user = await this.repository.getUserById(id);
            if (!user) {
                return res.status(404).json(formatError(`User with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting user by id, ${err}`));
        }

        try {
            const user = await this.repository.modifyUser(id, userData);
            if (user) {
                return res.status(200).json(formatResponse({ user }));
            } else {
                return res.status(404).json(formatError(`User with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error modifying the user, ${err}`));
        }
    }
}

module.exports = { UserController };
