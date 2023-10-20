class Pattern {
    constructor(pattern_id, pattern_name, pattern_theme) {
        this._pattern_id = pattern_id;
        this._pattern_name = pattern_name;
        this._pattern_theme = pattern_theme;
    }

    get pattern_id() {
        return this._pattern_id;
    }

    set pattern_id(value) {
        this._pattern_id = value;
    }

    get pattern_name() {
        return this._pattern_name;
    }

    set pattern_name(value) {
        this._pattern_name = value;
    }

    get pattern_theme() {
        return this._pattern_theme;
    }

    set pattern_theme(value) {
        this._pattern_theme = value;
    }
}

module.exports = { Pattern };