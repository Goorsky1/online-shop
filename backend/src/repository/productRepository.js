const { Product } = require("../models/Product");

class ProductRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllProducts() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT product_id, product_name, product_color, product_material, product_diameter, product_width, pattern_id, product_count, product_price, product_description, product_image FROM products';
            this.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const products = rows.map(row => new Product(row.product_id, row.product_name, row.product_color, row.product_material, row.product_diameter, row.product_width, row.pattern_id, row.product_count, row.product_price, row.product_description, row.product_image));
                    resolve(products);
                }
            });
        });
    }

    async getProductById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM products WHERE product_id = ?';
            this.db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(new Product(row.product_id, row.product_name, row.product_color, row.product_material, row.product_diameter, row.product_width, row.pattern_id, row.product_count, row.product_price, row.product_description, row.product_image));
                } else {
                    resolve()
                }
            });
        });
    }

    async addProduct(product) {
        const query = 'INSERT INTO products (product_name, product_color, product_material, product_diameter, product_width, pattern_id, product_count, product_price, product_description, product_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            product.product_name,
            product.product_color,
            product.product_material,
            product.product_diameter,
            product.product_width,
            product.pattern_id,
            product.product_count,
            product.product_price,
            product.product_description,
            product.product_image
        ];

        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Product(
                        this.lastID,
                        product.product_name,
                        product.product_color,
                        product.product_material,
                        product.product_diameter,
                        product.product_width,
                        product.pattern_id,
                        product.product_count,
                        product.product_price,
                        product.product_description,
                        product.product_image
                    ));
                }
            });
        });
    }

    async deleteProductById(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM products WHERE product_id = ?`;
            this.db.run(query, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async modifyProduct(productId, updatedProduct) {
        const query = `
        UPDATE products 
        SET 
            product_name = ?, 
            product_color = ?, 
            product_material = ?, 
            product_diameter = ?, 
            product_width = ?, 
            pattern_id = ?, 
            product_count = ?, 
            product_price = ?, 
            product_description = ?, 
            product_image = ? 
        WHERE product_id = ?
    `;

        const values = [
            updatedProduct.product_name,
            updatedProduct.product_color,
            updatedProduct.product_material,
            updatedProduct.product_diameter,
            updatedProduct.product_width,
            updatedProduct.pattern_id,
            updatedProduct.product_count,
            updatedProduct.product_price,
            updatedProduct.product_description,
            updatedProduct.product_image,
            productId
        ];

        return new Promise((resolve, reject) => {
            this.db.run(query, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Product(
                        productId,
                        updatedProduct.product_name,
                        updatedProduct.product_color,
                        updatedProduct.product_material,
                        updatedProduct.product_diameter,
                        updatedProduct.product_width,
                        updatedProduct.pattern_id,
                        updatedProduct.product_count,
                        updatedProduct.product_price,
                        updatedProduct.product_description,
                        updatedProduct.product_image,
                    ));
                }
            });
        });
    }
}

module.exports = { ProductRepository };
