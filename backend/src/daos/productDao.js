const {Product} = require("../models/Product");

class ProductDao {
    constructor(db) {
        this.db = db;
    }

    getAllProducts(callback) {
        const query = 'SELECT product_id, product_name, product_color, product_material, product_diameter, product_width, pattern_id, product_count, product_price, product_description, product_image FROM products';
        this.db.all(query, (err, rows) => {
            if (err) {
                return callback(err);
            }
            const products = rows.map(row => new Product(row.product_id, row.product_name, row.product_color, row.product_material, row.product_diameter, row.product_width, row.pattern_id, row.product_count, row.product_price, row.product_description, row.product_image));
            callback(null, products);
        });
    }

    getProductById(id, callback) {
        const query = 'SELECT * FROM products WHERE product_id = ?';
        this.db.get(query, [id], function(err, row) {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        })
    }

    addProduct(product, callback) {
        const query = 'INSERT INTO products (product_name, product_color, product_material, product_diameter, product_width, pattern_id, product_count, product_price, product_description, product_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [product.product_name, product.product_color, product.product_material, product.product_diameter, product.product_width, product.pattern_id, product.product_count, product.product_price, product.product_description, product.product_image];
        this.db.run(query, values, function (err) {
            if (err) {
                return callback(err);
            }
            const newProductId = this.lastID;
            callback(null, newProductId);
        });
    }



    deleteProductById(id, callback) {
        const query = `DELETE FROM products WHERE product_id = ?`;
        this.db.run(query, [id], function(err, row) {
            if (err) {
                return callback(err);
            }
            console.log("row:", row);
            callback(null, "deleted");
        })
    }
    modifyProduct(productId, updatedProduct, callback) {
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

        this.db.run(query, values, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, "Product Updated");
        });
    }
}

module.exports = {ProductDao};

