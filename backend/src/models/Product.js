class Product {
    constructor(product_id, product_name, product_color, product_material, product_diameter, product_width, pattern_id, product_count, product_price, product_description, product_image) {
        this._product_id = product_id;
        this._product_name = product_name;
        this._product_color = product_color;
        this._product_material = product_material;
        this._product_diameter = product_diameter;
        this._product_width = product_width;
        this._pattern_id = pattern_id;
        this._product_count = product_count;
        this._product_price = product_price;
        this._product_description = product_description;
        this._product_image = product_image;
    }

    get product_id() {
        return this._product_id;
    }

    set product_id(value) {
        this._product_id = value;
    }

    get product_name() {
        return this._product_name;
    }

    set product_name(value) {
        this._product_name = value;
    }

    get product_color() {
        return this._product_color;
    }

    set product_color(value) {
        this._product_color = value;
    }

    get product_material() {
        return this._product_material;
    }

    set product_material(value) {
        this._product_material = value;
    }

    get product_diameter() {
        return this._product_diameter;
    }

    set product_diameter(value) {
        this._product_diameter = value;
    }

    get product_width() {
        return this._product_width;
    }

    set product_width(value) {
        this._product_width = value;
    }

    get pattern_id() {
        return this._pattern_id;
    }

    set pattern_id(value) {
        this._pattern_id = value;
    }

    get product_count() {
        return this._product_count;
    }

    set product_count(value) {
        this._product_count = value;
    }

    get product_price() {
        return this._product_price;
    }

    set product_price(value) {
        this._product_price = value;
    }

    get product_description() {
        return this._product_description;
    }

    set product_description(value) {
        this._product_description = value;
    }

    get product_image() {
        return this._product_image;
    }

    set product_image(value) {
        this._product_image = value;
    }

    toJSON() {
        return {
            product_id: this._product_id,
            product_name: this._product_name,
            product_color: this._product_color,
            product_material: this._product_material,
            product_diameter: this._product_diameter,
            product_width: this._product_width,
            pattern_id: this._pattern_id,
            product_count: this._product_count,
            product_price: this._product_price,
            product_description: this._product_description,
            product_image: this._product_image,
        };
    }
}

module.exports = { Product };