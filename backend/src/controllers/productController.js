class ProductController {
    constructor(repository) {
        this.repository = repository;
    }

    getAllProducts(req, res) {
        this.repository.getAllProducts((err, data) => {
            if (err) {

                res.status(500).send('Error retrieving data');
            } else {

                res.json(data);
            }
        });
    }

    addProduct(req, res) {
        const productData = req.body;
        this.repository.addProduct(productData, (err, newProductId) => {
            if (err) {

                res.status(500).send('Error adding a new product');
            } else {
                res.status(201).json({ id: newProductId });
            }
        });
    }

    getProductById(req, res) {
        const id = req.params.id
        this.repository.getProductById(id, (err, product) => {
            if (err) {

                res.status(500).send('Error getting product by id');
            } else {
                res.status(200).json({ product: product });
            }
        });
    }

    deleteProductById(req, res) {
        const id = req.params.id

        this.repository.deleteProductById(id, (err) => {
            if (err) {

                res.status(500).send('Error deleting product by id');
            } else {
                res.status(204).json({});
            }
        });
    }

    modifyProduct(req, res) {
        const id = req.params.id;
        const updatedProductData = req.body;
        this.repository.modifyProduct(id, updatedProductData, (err, message) => {
            if (err) {
                res.status(500).send('Error updating product');
            } else {
                res.status(200).json({ message: message });
            }
        });
    }
}

module.exports = { ProductController };