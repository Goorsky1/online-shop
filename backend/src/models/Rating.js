class Rating {
    constructor(product_id, user_id, rating_value) {
        this._product_id = product_id;
        this._user_id = user_id;
        this._rating_value = rating_value;
    }

    get product_id() {
        return this._product_id;
    }

    set product_id(value) {
        this._product_id = value;
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get rating_value() {
        return this._rating_value;
    }

    set rating_value(value) {
        this._rating_value = value;
    }
}

module.exports = { Rating };