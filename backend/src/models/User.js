class User {
    constructor(user_id, user_email, user_password, user_status, user_phone, user_permissions) {
        this._user_id = user_id;
        this._user_email = user_email;
        this._user_password = user_password;
        this._user_status = user_status;
        this._user_phone = user_phone;
        this._user_permissions = user_permissions;
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get user_email() {
        return this._user_email;
    }

    set user_email(value) {
        this._user_email = value;
    }

    get user_password() {
        return this._user_password;
    }

    set user_password(value) {
        this._user_password = value;
    }

    get user_status() {
        return this._user_status;
    }

    set user_status(value) {
        this._user_status = value;
    }

    get user_phone() {
        return this._user_phone;
    }

    set user_phone(value) {
        this._user_phone = value;
    }

    get user_permissions() {
        return this._user_permissions;
    }

    set user_permissions(value) {
        this._user_permissions = value;
    }
}

module.exports = {User};