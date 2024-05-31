"use strict";
//App/Presentation/ScoreView

class ScoreView {

    displayScore(diceCount, diceSum, diceOfAKind, straights) {
        this.revealInfo();
        this.displayDiceRolled(diceCount);
        this.displayOfAKind(diceOfAKind, diceSum);
        this.displayStraights(straights);
        this.fillScore("chance", diceSum);
        this.displayTotalDiceSelected();
        this.checkBonus();
        this.displayTotalScore("total-score", '[id$="-score"].saved, #bonus-dice-score');
    }

    revealInfo() {
        document.getElementById("attempts").removeAttribute("hidden");
        document.getElementById("turns").removeAttribute("hidden");
        document.getElementById("explanation").hidden = false;
    }

    resetScores() {
        const scoreCells = document.querySelectorAll('[id$="-score"]');
        scoreCells.forEach(cell => {
            if (!cell.classList.contains('saved')) {
                cell.innerHTML = "0";
            }
        });
    }

    checkBonus() {
        if (parseInt(document.getElementById("total-dice-score").innerHTML) >= 63) {
            document.getElementById("bonus-dice-score").innerHTML = 35;
        }
    }

    displayOfAKind(message, diceSum) {
        switch (message) {
            case "yahtzee":
                this.fillScore("yahtzee", 50);
                this.fillScore("full-house", 0);
                this.fillScore("four-kind", diceSum);
                this.fillScore("three-kind", diceSum);
                break;
            case "4 of a kind":
                this.fillScore("yahtzee", 0);
                this.fillScore("full-house", 0);
                this.fillScore("four-kind", diceSum);
                this.fillScore("three-kind", diceSum);
                break;
            case "3 of a kind":
                this.fillScore("yahtzee", 0);
                this.fillScore("full-house", 0);
                this.fillScore("four-kind", 0);
                this.fillScore("three-kind", diceSum);
                break;
            case "full house":
                this.fillScore("yahtzee", 0);
                this.fillScore("full-house", 25);
                this.fillScore("four-kind", 0);
                this.fillScore("three-kind", diceSum);
                break;
            default:
                this.fillScore("yahtzee", 0);
                this.fillScore("full-house", 0);
                this.fillScore("four-kind", 0);
                this.fillScore("three-kind", 0);
                break;
        }
    }

    displayStraights(message) {
        switch (message) {
            case "large straight":
                this.fillScore("large-straight", 40);
                this.fillScore("small-straight", 30);
                break;
            case "small straight":
                this.fillScore("large-straight", 0);
                this.fillScore("small-straight", 30);
                break;
            default:
                this.fillScore("large-straight", 0);
                this.fillScore("small-straight", 0);
                break;
        }
    }

    fillScore(target, number) {
        const element = document.getElementById(`${target}-score`);
        if (!element.classList.contains('saved')) {
            element.innerHTML = number;
        }
    }

    displayDiceRolled(diceCount) {
        let teller = 1;
        for (const die of diceCount) {
            if (!document.getElementById(`${teller}-score`).classList.contains('saved')) {
                document.getElementById(`${teller}-score`).innerHTML = die;
            }
            teller++;
        }
    }

    displayTotalDiceSelected() {
        let total = 0;
        for (let i = 1; i <= 6; i++) {
            const cell = document.getElementById(`${i}-score`);
            if (cell.classList.contains('saved')) {
                total += parseInt(cell.textContent);
            }
        }
        document.getElementById("total-dice-score").innerHTML = total;
    }

    displayTotalScore(targetId, selectorPattern) {
        let total = 0;
        const scoreCells = document.querySelectorAll(selectorPattern);
        scoreCells.forEach(cell => {
            total += parseInt(cell.textContent);
        });
        document.getElementById(targetId).innerHTML = total;
    }

}

export { ScoreView };