class PatternController {
    constructor(dao) {
        this.dao = dao;
    }

    getAllPatterns(req, res) {
        this.dao.getAllPatterns((err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                console.log(data);
                res.json(data);
            }
        });
    }

    addPattern(req, res) {
        const patternData = req.body;
        this.dao.addPattern(patternData, (err, newPatternId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding a new pattern');
            } else {
                res.status(201).json({id: newPatternId});
            }
        });
    }

    getPatternById(req, res) {
        const id = req.params.id
        this.dao.getPatternById(id, (err, pattern) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error getting pattern by id');
            } else {
                res.status(200).json({pattern: pattern});
            }
        });
    }

    deletePatternById(req, res) {
        const id = req.params.id
        this.dao.deletePatternById(id, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting pattern by id');
            } else {
                res.status(204).json({});
            }
        });
    }
}

module.exports = {PatternController};