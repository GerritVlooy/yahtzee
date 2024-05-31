"use strict";
//App/Entities/DiceCollection.js

import { Dice } from "./Dice.js";

class DiceCollection {

    constructor() {
        this._diceArray = [];
        this._timesRolled = 0;
        for (let i = 1; i <= 5; i++) {
            let dice = new Dice(i, 1, false);
            this._diceArray.push(dice);
        }
    }

    get diceArray() {
        return this._diceArray;
    }

    get timesRolled() {
        return this._timesRolled;
    }

    set timesRolled(number) {
        this._timesRolled = number;
    }
    
}

export { DiceCollection };