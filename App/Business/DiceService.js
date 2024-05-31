"use strict";
//App/Business/DiceService
import { DiceCollection } from "../Entities/DiceCollection.js";

class DiceService {

    constructor() {
        this.diceCollection = new DiceCollection();
        this.diceHoldArray = [];
        this._turnCounter = 1;
    }

    get turnCounter() {
        return this._turnCounter;
    }

    set turnCounter(number) {
        this._turnCounter = number;
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    diceCheck(diceIMG, number) {
        diceIMG.setAttribute("src", `img/${number}.png`);
    }

    displayDice() {
        let counter = 1;
        let diceArray = this.diceCollection.diceArray;
        diceArray.forEach(die => {
            const diceIMG = document.createElement("img");
            diceIMG.setAttribute("id", `${counter}`);
            diceIMG.setAttribute("hidden", "true");
            this.diceCheck(diceIMG, die.number);
            diceIMG.setAttribute("class", "dice-free");
            diceIMG.addEventListener("click", () => {
                this.holdHandling(die);
            });
            document.getElementById("dice-container").append(diceIMG);
            counter++;
        });

        document.getElementById("attempts").innerHTML = `attempt: ${this.diceCollection.timesRolled}/3`;
        document.getElementById("turns").innerHTML = `turns: ${this._turnCounter}/13`;
    }


    fillCounter(target, number) {
        document.getElementById(target).innerHTML = number;
    }

    holdHandling(die) {
        die.hold = !die.hold;
        const element = document.getElementById(die.id).classList;
        if (die.hold === true) {
            element.remove("dice-free");
            element.add("dice-hold");
        } else {
            element.remove("dice-hold");
            element.add("dice-free");
        }
    }

    throwDice() {
        this.rerollDice();
        this.diceCollection.timesRolled++;
        this.fillCounter("attempts", `attempt: ${this.diceCollection.timesRolled}/3`);
        this.turnCheck();
    }

    advanceTurn() {
        this.diceCollection.timesRolled = 0;
        this.turnCounter++;
        this.fillCounter("attempts", `attempt: ${this.diceCollection.timesRolled}/3`);
        this.fillCounter("turns", `turn: ${this._turnCounter}/13`);
        this.diceCollection.diceArray.forEach(die => {
            if (die.hold === true) {
                this.holdHandling(die);
            }
        })
    }

    turnCheck() {
        if (this.turnCounter > 13 || this._saveCounter === 14) {
            document.getElementById("roll-button").disabled = true;
            this.fillCounter("attempts", "no attempts left!");
            this.fillCounter("turns", "no turns left!");
            document.getElementById("explanation").hidden = true;
        }
    }

    rerollDice() {
        this.diceCollection.diceArray.forEach(die => {
            document.getElementById(die.id).removeAttribute("hidden");
            if (die.hold === false) {
                die.number = this.rollDie();
            }
            this.diceCheck(document.getElementById(die.id), die.number);
        });
    }

    rollCheck() {
       if (this.diceCollection.timesRolled === 3) {
        document.getElementById("roll-button").disabled = true;
        document.getElementById("warning").style.display = "block";
       } else {
        document.getElementById("roll-button").disabled = false;
        document.getElementById("warning").style.display = "none";
       }
    }
}

export { DiceService };