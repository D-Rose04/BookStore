class User {
    id;
    name;
    email;
    password;
    _isAdmin;

    constructor() {
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

}