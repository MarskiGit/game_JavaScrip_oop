"use strict";
import {
    Cell
} from './Cell.js'
class Game {
    constructor() {
        this.config = {
            easy: {
                rows: 8,
                cols: 8,
                mines: 10
            },
            medium: {
                rows: 16,
                cols: 16,
                mines: 40
            },
            expert: {
                rows: 1,
                cols: 30,
                mines: 99
            },
        };
        this.numberOfRows = null;
        this.numberOfCols = null;
        this.numberOfmines = null;
        this.celss = [];

    };
    initializeGame() {
        this.newGame();
    };
    newGame(
        rows = this.config.easy.rows,
        cols = this.config.easy.cols,
        mines = this.config.easy.mines
    ) {
        this.numberOfRows = rows;
        this.numberOfCols = cols;
        this.numberOfmines = mines;

        this.generateCells();
    };
    generateCells() {

        for (let row = 0; row < this.numberOfRows; row++) {
            this.celss[row] = [];

            for (let col = 0; col < this.numberOfCols; col++) {
                this.celss[row].push(new Cell(col, row));
            }
        };
    };

}

window.onload = function () {
    const game = new Game();
    game.initializeGame();
};