class ProductController {
    constructor(dao) {
        this.dao = dao;
    }

    getAllProducts(req, res) {
        this.dao.getAllProducts((err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                console.log(data);
                res.json(data);
            }
        });
    }

    addProduct(req, res) {
        const productData = req.body;
        this.dao.addProduct(productData, (err, newProductId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding a new product');
            } else {
                res.status(201).json({id: newProductId});
            }
        });
    }

    getProductById(req, res) {
        const id = req.params.id
        this.dao.getProductById(id, (err, product) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error getting product by id');
            } else {
                res.status(200).json({product: product});
            }
        });
    }

    deleteProductById(req, res) {
        const id = req.params.id
        console.log("id:", id)
        this.dao.deleteProductById(id, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting product by id');
            } else {
                res.status(204).json({});
            }
        });
    }
}

module.exports = {ProductController};