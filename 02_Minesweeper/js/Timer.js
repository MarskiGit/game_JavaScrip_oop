"use strict";
import UI from './UI.js';

export default class Timer extends UI {
    constructor() {
        super();
        this.element = this.getElement(this.UiSelectors.timer);
        this.interval = null;
        this.numberOfSeconds = 0;
        this.maxNumberOfSeconds = 999;
    };
    startTimer() {
        this.interval = setInterval(() => this.numberTimer(), 1000);
    };
    stopTimer() {
        clearInterval(this.interval);
    };
    numberTimer() {
        this.numberOfSeconds++;
        this.numberOfSeconds <= this.maxNumberOfSeconds ? this.setTimerValue(this.numberOfSeconds) : this.stopTimer();
    };
    setTimerValue(value) {
        this.element.textContent = value;
    };
};