const { formatResponse } = require("../models/Response");
const { formatError } = require("../models/Error");

class PatternController {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllPatterns(req, res) {
        try {
            const patterns = await this.repository.getAllPatterns();
            res.json(formatResponse({ patterns }));
        } catch (err) {
            res.status(500).json(formatError(`Error retrieving data, ${err}`));
        }
    }

    async addPattern(req, res) {
        const patternData = req.body;
        try {
            const newPattern = await this.repository.addPattern(patternData);
            res.status(201).json(formatResponse({ "pattern": newPattern }));
        } catch (err) {
            res.status(500).json(formatError(`Error adding a new pattern, ${err}`));
        }
    }

    async getPatternById(req, res) {
        const id = req.params.id;
        try {
            const pattern = await this.repository.getPatternById(id);
            if (pattern) {
                res.status(200).json(formatResponse({ pattern }));
            } else {
                res.status(404).json(formatError(`Pattern with id ${id} not found`));
            }
        } catch (err) {
            res.status(500).json(formatError(`Error getting pattern by id, ${err}`));
        }
    }

    async deletePatternById(req, res) {
        const id = req.params.id;
        try {
            const pattern = await this.repository.getPatternById(id);
            if (!pattern) {
                return res.status(404).json(formatError(`Pattern with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting pattern by id, ${err}`));
        }

        try {
            await this.repository.deletePatternById(id);
            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).json(formatError(`Error deleting pattern by id, ${err}`));
        }
    }

    async modifyPattern(req, res) {
        const id = req.params.id;
        const updatedPatternData = req.body;

        try {
            const pattern = await this.repository.getPatternById(id);
            if (!pattern) {
                return res.status(404).json(formatError(`Pattern with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting pattern by id, ${err}`));
        }

        try {
            const pattern = await this.repository.modifyPattern(id, updatedPatternData);
            return res.status(200).json(formatResponse({ pattern }));
        } catch (err) {
            return res.status(500).json(formatError(`Error updating pattern, ${err}`));
        }
    }
}

module.exports = { PatternController };
