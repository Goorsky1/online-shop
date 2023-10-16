class UserController {
    constructor(dao) {
        this.dao = dao;
    }

    getAllUsers(req, res) {
        this.dao.getAllUsers((err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                console.log(data);
                res.json(data);
            }
        });
    }

    addUser(req, res) {
        const userData = req.body;
        this.dao.addUser(userData, (err, newUserId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding a new user');
            } else {
                res.status(201).json({id: newUserId});
            }
        });
    }

    getUserById(req, res) {
        const id = req.params.id
        console.log("id:", id)
        this.dao.getUserById(id, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error getting user by id');
            } else {
                res.status(200).json({user: user});
            }
        });
    }

    deleteUserById(req, res) {
        const id = req.params.id
        console.log("id:", id)
        this.dao.deleteUserById(id, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting user by id');
            } else {
                res.status(204).json({});
            }
        });
    }
}

module.exports = {UserController};