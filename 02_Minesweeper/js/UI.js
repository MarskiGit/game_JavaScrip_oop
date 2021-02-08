"use strict";
export default class UI {
    constructor() {
        this.UiSelectors = {
            board: '[data-board]',
            cell: '[data-cell]',
            counter: '[data-counter]',
            timer: '[data-timer]',
            resetButton: '[data-button-reset]',
            easyButton: '[data-button-easy]',
            normalButton: '[data-button-normal]',
            expertButton: '[data-button-expert]',
            modal: '[data-modal]',
            modalHeader: '[data-modal-header]',
            modalButton: '[data-modal-button]'
        };
    };
    getElement = selector => document.querySelector(selector);
    getElements = selector => document.querySelectorAll(selector);
};