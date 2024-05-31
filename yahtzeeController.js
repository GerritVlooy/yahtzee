"use strict";
//yahtzeeController.js

import { DiceService } from "./App/Business/DiceService.js";
import { YahtzeeService } from "./App/Business/YahtzeeService.js";
import { ScoreView } from "./App/Presentation/ScoreView.js";

const diceService = new DiceService();
const yahtzeeService = new YahtzeeService();
const scoreView = new ScoreView();
let start = false;

diceService.displayDice();
yahtzeeService.setRestart("newgame-button");

document.getElementById("roll-button").addEventListener("click", () => {
    diceService.throwDice();
    diceService.rollCheck();
    yahtzeeService.addDiceToArrays("dice-container");
    const diceCount = yahtzeeService.countDice();
    scoreView.displayScore(diceCount, 
        yahtzeeService.getSumDice(diceCount), 
        yahtzeeService.checkDiceOfAKind(),
        yahtzeeService.checkForStraights());
    const scoreCells = document.querySelectorAll('table [id$="-score"]');

    if (start === false) {
        scoreCells.forEach(cell => {
            cell.addEventListener("click", () => {
                if (document.getElementById("attempts").innerHTML !== "attempt: 0/3" && !cell.classList.contains("score")) {
                    cell.classList.add("saved");
                    cell.classList.remove("number");
                    diceService.advanceTurn();
                    diceService.turnCheck();
                    diceService.throwDice();
                    yahtzeeService.addDiceToArrays("dice-container");
                    const diceCount = yahtzeeService.countDice();
                    scoreView.displayScore(diceCount, 
                        yahtzeeService.getSumDice(diceCount), 
                        yahtzeeService.checkDiceOfAKind(),
                        yahtzeeService.checkForStraights()); 
                    diceService.rollCheck();
                }
            }, { once: true })
        });
        start = true;
    }
});