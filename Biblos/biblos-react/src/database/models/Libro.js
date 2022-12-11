class Libro {
    // label URL
    _image;
    _title;
    _author = Object;
    _price = Number;

    constructor() {
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}