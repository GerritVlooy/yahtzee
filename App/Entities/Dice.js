"use strict";

class Dice {

    constructor(id, number, hold) {
        this._id = id;
        this._hold = hold;
        this._number = number;
    }

    get id() {
        return this._id;
    }

    get number() {
        return this._number;
    }

    get hold() {
        return this._hold;
    }

    set number(value) {
        this._number = value;
    }

    set hold(value) {
        this._hold = value;
    }
}

export { Dice };