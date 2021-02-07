"use strict";
export default class UI {
    constructor() {
        this.UiSelectors = {
            board: '[data-board]',
            cell: '[data-cell]',
            counter: '[data-counter]',
            timer: '[data-timer]'
        };
    };
    getElement = selector => document.querySelector(selector);
    getElements = selector => document.querySelectorAll(selector);
};