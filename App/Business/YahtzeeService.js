"use strict";
//App/Business/YahtzeeService

class YahtzeeService {

    constructor() {
        this._diceAmount = [0, 0, 0, 0, 0, 0];
        this._diceSum = 0;
    }

    get DiceAmount() {
        return this._diceAmount;
    }

    setRestart(target) {
        document.getElementById(target).addEventListener("click", () => {
            location.reload();
        });
    }

    countDice() {
        let teller = 1;
        const array = []
        for (const die of this._diceAmount) {
            array.push(teller * die);
            teller++;
        }
        return array;
    }

    getSumDice(array) {
        const initialValue = 0;
        const sumWithInitial = array.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );
        return sumWithInitial;
    }

    addDiceToArrays(target) {
        let element = document.getElementById(`${target}`);
        this._diceAmount = [0, 0, 0, 0, 0, 0];
        for (const child of element.children) {
            const imageName = child.getAttribute("src");
            const fileName = imageName.substring(imageName.lastIndexOf('/') + 1);
            const numberStr = fileName.substring(0, fileName.lastIndexOf('.'));
            const number = parseInt(numberStr);
            this._diceAmount[number - 1]++;
        }
    }

    checkDiceOfAKind() {
        let hasTwo = false;
        let hasThree = false;

        for (const die of this._diceAmount) {
            switch (die) {
                case 5:
                    return "yahtzee";
                case 4:
                    return "4 of a kind";
                case 3:
                    hasThree = true;
                    break;
                case 2:
                    hasTwo = true;
                    break;
            }
        }

        if (hasThree && hasTwo) {
            return "full house";
        }

        if (hasThree) {
            return "3 of a kind";
        }

        return undefined;
    }

    checkZeroCount(array) {
        let teller = 0;
    
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 0) {
                teller++;
                if (teller > 2) {
                    return true;
                }
            }
        }
    
        return false;
    }

    checkFourNonZeroInARow(array) {
        for (let i = 0; i <= array.length - 4; i++) {
            if (!array.slice(i, i + 4).includes(0)) {
                return true;
            }
        }
        return false;
    }

    checkForStraights() {
        if (this.checkZeroCount(this._diceAmount)) {
            return undefined;
        }

        if (this._diceAmount[2] === 0 || this._diceAmount[3] === 0) {
            return undefined;
        }

        const firstIndex = this._diceAmount.indexOf(0);
        const lastIndex = this._diceAmount.lastIndexOf(0);

        if (firstIndex === 0 || firstIndex === 5) {
            if (firstIndex === lastIndex) {
                return "large straight";
            }
        }

        if (this.checkFourNonZeroInARow(this._diceAmount) === true) {
            return "small straight";
        }

        return undefined;
    }

    getTotalScore() {
        const cells = document.querySelectorAll('td');
        let total = 0;
        cells.forEach(function (cell) {
            if (!["1-score", "2-score", "3-score", "4-score", "5-score", "6-score", "total-score"].includes(cell.id)) {
                let cellValue = parseInt(cell.textContent);
                if (!isNaN(cellValue)) {
                    total += cellValue;
                }
            }
        });
        console.log(total);
        return total;
    }
}

export { YahtzeeService };