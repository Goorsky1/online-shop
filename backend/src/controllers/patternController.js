class PatternController {
    constructor(repository) {
        this.repository = repository;
    }

    getAllPatterns(req, res) {
        this.repository.getAllPatterns((err, data) => {
            if (err) {

                res.status(500).send('Error retrieving data');
            } else {

                res.json(data);
            }
        });
    }

    addPattern(req, res) {
        const patternData = req.body;
        this.repository.addPattern(patternData, (err, newPatternId) => {
            if (err) {

                res.status(500).send('Error adding a new pattern');
            } else {
                res.status(201).json({ id: newPatternId });
            }
        });
    }

    getPatternById(req, res) {
        const id = req.params.id
        this.repository.getPatternById(id, (err, pattern) => {
            if (err) {

                res.status(500).send('Error getting pattern by id');
            } else {
                res.status(200).json({ pattern: pattern });
            }
        });
    }

    deletePatternById(req, res) {
        const id = req.params.id
        this.repository.deletePatternById(id, (err) => {
            if (err) {
                res.status(500).send('Error deleting pattern by id');
            } else {
                res.status(204).json({});
            }
        });
    }

    modifyPattern(req, res) {
        const id = req.params.id;
        const updatedPatternData = req.body;

        this.repository.modifyPattern(id, updatedPatternData, (err, message) => {
            if (err) {
                res.status(500).send('Error updating pattern');
            } else {
                res.status(200).json({ message: message });
            }
        });
    }
}

module.exports = { PatternController };