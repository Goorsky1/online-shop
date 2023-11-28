const { formatResponse } = require("../models/Response");
const { formatError } = require("../models/Error");

class ProductController {
    constructor(productRepository, patternRepository) {
        this.productRepository = productRepository;
        this.patternRepository = patternRepository;
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAllProducts();
            res.json(formatResponse({ products }));
        } catch (err) {
            res.status(500).json(formatError(`Error retrieving data, ${err}`));
        }
    }

    async addProduct(req, res) {
        const productData = req.body;
        try {
            const pattern = await this.patternRepository.getPatternById(productData.pattern_id);
            if (!pattern) {
                return res.status(404).json(formatError(`Error adding a new product, pattern ${productData.pattern_id} does not exist`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error adding a new product, ${err}`));
        }

        try {
            const newProduct = await this.productRepository.addProduct(productData);
            return res.status(201).json(formatResponse({ "product": newProduct }));
        } catch (err) {
            return res.status(500).json(formatError(`Error adding a new product, ${err}`));
        }
    }

    async getProductById(req, res) {
        const id = req.params.id;
        try {
            const product = await this.productRepository.getProductById(id);
            if (product) {
                res.status(200).json(formatResponse({ product }));
            } else {
                res.status(404).json(formatError(`Product with id ${id} not found`));
            }
        } catch (err) {
            res.status(500).json(formatError(`Error getting product by id, ${err}`));
        }
    }

    async deleteProductById(req, res) {
        const id = req.params.id;
        try {
            const product = await this.productRepository.getProductById(id);
            if (!product) {
                return res.status(404).json(formatError(`Product with id ${id} not found`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting product by id, ${err}`));
        }

        try {
            await this.productRepository.deleteProductById(id);
            return res.sendStatus(204);
        } catch (err) {
            return res.status(500).json(formatError(`Error deleting product by id, ${err}`));
        }
    }

    async modifyProduct(req, res) {
        const id = req.params.id;
        let productData = req.body;
        let product
        try {
            product = await this.productRepository.getProductById(id);
            if (!product) {
                return res.status(404).json(formatError(`Product with id ${id} not found`));
            } else {
                const parsedProduct = JSON.parse(JSON.stringify(product)) //get rid of underscores from model
                productData = { ...parsedProduct, ...productData }
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error getting product by id, ${err}`));
        }

        try {
            const pattern = await this.patternRepository.getPatternById(productData.pattern_id);
            if (!pattern) {
                return res.status(404).json(formatError(`Error modifying a new product, pattern ${productData.pattern_id} does not exist`));
            }
        } catch (err) {
            return res.status(500).json(formatError(`Error modifying a new product, ${err}`));
        }

        try {
            const modifiedProduct = await this.productRepository.modifyProduct(id, productData);
            return res.status(200).json(formatResponse({ product: modifiedProduct }));
        } catch (err) {
            return res.status(500).json(formatError(`Error updating product, ${err}`));
        }
    }

    async processCheckout(req, res) {
        const productsInCart = req.body.products_in_cart;

        const updatedProducts = [];
        try {
            for (const cartProduct of productsInCart) {
                const product = await this.productRepository.getProductById(cartProduct.product_id);

                if (!product) {
                    return res.status(404).json(formatError(`Product with id ${cartProduct.product_id} not found`));
                }

                if (product.product_count < cartProduct.count) {
                    return res.status(400).json(formatError(`Insufficient stock for ${cartProduct.product_name}`));
                }


                let updatedProduct = product;
                updatedProduct.product_count = product.product_count - cartProduct.count


                updatedProducts.push(updatedProduct);
            }

            for (const updatedProduct of updatedProducts) {
                await this.productRepository.modifyProduct(updatedProduct.product_id, updatedProduct);
            }

            return res.status(200).json(formatResponse({ message: 'Checkout successful' }));
        } catch (err) {
            return res.status(500).json(formatError(`Error processing checkout, ${err}`));
        }
    }
}

module.exports = { ProductController };
