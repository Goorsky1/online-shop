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
        const id = req.params.id
        const ratingData = req.body;
        this.dao.addRating(id, ratingData, (err, productId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding a new rating');
            } else {
                res.status(201).json({id: productId});
            }
        });
    }

    // getProductById(req, res) {
    //     const id = req.params.id
    //     this.dao.getProductById(id, (err, product) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('Error getting product by id');
    //         } else {
    //             res.status(200).json({product: product});
    //         }
    //     });
    // }
    //
    // deleteProductById(req, res) {
    //     const id = req.params.id
    //     console.log("id:", id)
    //     this.dao.deleteProductById(id, (err) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send('Error deleting product by id');
    //         } else {
    //             res.status(204).json({});
    //         }
    //     });
    // }
}

module.exports = {RatingController};