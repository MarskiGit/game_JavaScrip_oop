"use strict";
import UI from './UI.js';

export default class ResetButton extends UI {
    constructor() {
        super();
        this.element = this.getElement(this.UiSelectors.resetButton);
    };
    changeEmotion(emotion) {
        this.element.querySelector('use').setAttribute('href', `./assets/sprite.svg#${emotion}`);
    };
}