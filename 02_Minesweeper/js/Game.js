"use strict";
import Cell from './Cell.js';
import UI from './UI.js';
import Counter from './Counter.js';
import Timer from './Timer.js';

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
        this.Counter = new Counter();
        this.Timer = new Timer();

        this.isGameFinished = false;
        this.numberOfRows = null;
        this.numberOfCols = null;
        this.numberOfmines = null;
        this.cells = [];
        this.celssElements = null;
        this.board = null;

    };
    initializeGame() {
        this.handleElements();
        this.Counter.init();
        this.Timer.startTimer();
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
        this.Counter.setValue(this.numberOfmines);
        this.setStyle();

        this.generateCells();
        this.renderBoard();
        this.placeMinesinCells();

        this.celssElements = this.getElement(this.UiSelectors.board);

        this.addCelssEventListeners();
    };
    endGame(isWin) {
        this.isGameFinished = true;
        this.Timer.stopTimer();
        if (!isWin) {
            this.revealMines();
        }

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
        const azimuth = this.getAzimuth(event);
        if (azimuth) this.clickCell(this.cells[azimuth.rowIndex][azimuth.collIndex]);
    };
    placeMinesinCells() {
        let minesToPlace = this.numberOfmines;

        while (minesToPlace) {
            const rowIndex = this.getRandomInteger(0, this.numberOfRows - 1);
            const colIndex = this.getRandomInteger(0, this.numberOfCols - 1);

            const cell = this.cells[rowIndex][colIndex];

            if (!cell.isMine) {
                cell.addMine();
                minesToPlace--;
            };
        };
    };
    handleCellContextmenu = event => {
        event.preventDefault();
        const azimuth = this.getAzimuth(event);
        if (azimuth) {
            const cell = this.cells[azimuth.rowIndex][azimuth.collIndex];

            if (cell.isReval || this.isGameFinished) return
            if (cell.isFlagged) {
                this.Counter.increment();
                cell.toggleFlag();
                return
            };
            if (!!this.Counter.value) {
                this.Counter.decrement();
                cell.toggleFlag();
            };
        };
    };
    getAzimuth(event) {
        if (event.originalTarget.tagName === 'DIV') {
            const target = event.target;
            return {
                rowIndex: parseInt(event.target.getAttribute('data-y'), 10),
                collIndex: parseInt(event.target.getAttribute('data-x'), 10)
            };
        };
        return false;
    };
    clickCell(cell) {
        if (this.isGameFinished || cell.isFlagged) return
        if (cell.isMine) {
            this.endGame(false);
        };
        this.setCellValue(cell);
    };
    revealMines() {
        this.cells
            .flat().filter(({
                isMine
            }) => isMine).forEach(cell => cell.revalCell());
    };
    setCellValue(cell) {
        let minesCount = 0;
        const maxY = Math.max(cell.y - 1, 0),
            minY = Math.min(cell.y + 1, this.numberOfRows - 1),
            maxX = Math.max(cell.x - 1, 0),
            minX = Math.min(cell.x + 1, this.numberOfCols - 1);

        for (let rowIndex = maxY; rowIndex <= minY; rowIndex++) {
            for (let colIndex = maxX; colIndex <= minX; colIndex++) {
                if (this.cells[rowIndex][colIndex].isMine) minesCount++;
            };
        };

        cell.value = minesCount;
        cell.revalCell();

        if (!cell.value) {
            for (let rowIndex = maxY; rowIndex <= minY; rowIndex++) {
                for (let colIndex = maxX; colIndex <= minX; colIndex++) {
                    if (!this.cells[rowIndex][colIndex].isReveal) this.clickCell(this.cells[rowIndex][colIndex]);
                };
            };
        };
    };
    setStyle() {
        document.documentElement.style.setProperty('--cells-in-row', this.numberOfCols)
    };
    getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

};

window.onload = function () {
    const game = new Game();
    game.initializeGame();
};