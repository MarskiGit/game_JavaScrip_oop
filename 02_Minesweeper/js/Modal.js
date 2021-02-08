"use strict";
import UI from './UI.js';

export default class Modal extends UI {
    constructor() {
        super();
        this.buttonText = '';
        this.infoText = '';
        this.element = this.getElement(this.UiSelectors.modal);
        this.button = this.getElement(this.UiSelectors.modalButton);
        this.header = this.getElement(this.UiSelectors.modalHeader);
    };
    toggleModal = () => {
        this.element.classList.toggle('hide');
    };
    setText() {
        this.header.textContent = this.infoText;
        this.button.textContent = this.buttonText;
    };
};