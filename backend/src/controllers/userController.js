const { formatResponse } = require("../models/Response")
const { formatError } = require("../models/Error")
class UserController {
    constructor(repository) {
        this.repository = repository;
    }

    getAllUsers(req, res) {
        this.repository.getAllUsers((err, data) => {
            if (err) {
                res.status(500).json(formatError(`Error retrieving data, ${err}`));
            } else {
                res.json(formatResponse(data));
            }
        });
    }

    addUser(req, res) {
        const userData = req.body;

        this.repository.addUser(userData, (err, newUser) => {
            if (err) {
                res.status(500).json(formatError(`Error adding new user, ${err}`, 500));
            } else {
                res.status(201).json(formatResponse(newUser));
            }
        });
    }

    getUserById(req, res) {
        const id = req.params.id
        this.repository.getUserById(id, (err, user) => {
            if (err) {
                res.status(500).json(formatError(`Error getting user by id, ${err}`));
            } else {
                res.status(200).json(formatResponse(user));
            }
        });
    }

    deleteUserById(req, res) {
        const id = req.params.id
        this.repository.deleteUserById(id, (err) => {
            if (err) {
                res.status(500).json(formatError(`Error deleting user by id, ${err}`));
            } else {
                res.sendStatus(204);
            }
        });
    }

    modifyUser(req, res) {
        const userData = req.body;
        const id = req.params.id
        this.repository.modifyUser(id, userData, (err, modifiedUserId) => {
            if (err) {
                res.status(500).json(`Error modyfing the user, ${err}`);
            } else {
                res.status(200).json({ message: 'User modified successfully', id: modifiedUserId });
            }
        });
    }
}

module.exports = { UserController };