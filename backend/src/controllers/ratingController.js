class RatingController {
    constructor(dao) {
        this.dao = dao;
    }

    getAllRatingsByProductId(req, res) {
        const id = req.params.id
        this.dao.getAllRatingsByProductId(id, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                console.log(data);
                res.json(data);
            }
        });
    }

    addRating(req, res) {
        const productId = req.params.id;
        const ratingData = req.body;

        console.log('Received ratingData:', ratingData); // Debug log

        this.dao.addRating(productId, ratingData, (err, returnedProductId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding a new rating');
            } else {
                res.status(201).json({ id: returnedProductId });
            }
        });
    }

    getRatingByUserIdAndProductId(req, res) {
        const userId = req.params.idu;
        const productId = req.params.idp;

        this.dao.getRatingByUserIdAndProductId(userId, productId, (err, rating) => {
            if (err) {
                res.status(500).json({ error: "Error fetching rating" });
            } else {
                res.json(rating);
            }
        });
    }

    deleteRating(req, res) {
        const userId = req.params.idu;
        const productId = req.params.idp;

        this.dao.deleteRating(userId, productId, (err) => {
            if (err) {
                res.status(500).json({ error: "Error deleting rating" });
            } else {
                res.json({ message: "Rating successfully deleted" });
            }
        });
    }

    modifyRating(req, res) {
        const productId = req.params.id;
        const ratingData = req.body;
        console.log('Received ratingData:', ratingData); // Debug log
        this.dao.modifyRating( productId, ratingData, (err) => {
            if (err) {
                res.status(500).json({ error: "Error modifying rating" });
            } else {
                res.json({ message: "Rating successfully modified" });
            }
        });
    }
}

module.exports = {RatingController};