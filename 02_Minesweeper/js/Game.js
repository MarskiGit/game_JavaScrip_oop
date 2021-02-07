"use strict";
import Cell from './Cell.js';
import UI from './UI.js';

class Game extends UI {
    constructor() {
        super();
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
                rows: 16,
                cols: 30,
                mines: 99
            }
        };
        this.numberOfRows = null;
        this.numberOfCols = null;
        this.numberOfmines = null;
        this.cells = [];
        this.celssElements = null;
        this.board = null;

    };
    initializeGame() {
        this.handleElements();
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

        this.setStyle();

        this.generateCells();
        this.renderBoard();

        this.celssElements = this.getElement(this.UiSelectors.board);

        this.addCelssEventListeners();
    };
    handleElements() {
        this.board = this.getElement(this.UiSelectors.board);
    };
    addCelssEventListeners() {
        this.celssElements.addEventListener('click', this.handleCellClick);
        this.celssElements.addEventListener('contextmenu', this.handleCellContextmenu);

    };
    generateCells() {
        for (let row = 0; row < this.numberOfRows; row++) {
            this.cells[row] = [];

            for (let col = 0; col < this.numberOfCols; col++) {
                this.cells[row].push(new Cell(col, row));
            };
        };
    };
    renderBoard() {
        this.cells.flat().forEach(cell => {
            this.board.insertAdjacentHTML('beforeend', cell.createElement())
            cell.element = cell.getElement(cell.selector)
        })
    };
    handleCellClick = event => {
        if (event.originalTarget.tagName === 'DIV') {
            const target = event.target;
            const rowIndex = parseInt(target.getAttribute('data-y'), 10);
            const collIndex = parseInt(target.getAttribute('data-x'), 10);
            this.cells[rowIndex][collIndex].revalCell();

        };
    };
    handleCellContextmenu = () => {

    }
    setStyle() {
        document.documentElement.style.setProperty('--cells-in-row', this.numberOfCols)
    };
};

window.onload = function () {
    const game = new Game();
    game.initializeGame();
};