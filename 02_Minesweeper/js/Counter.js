"use strict";
import UI from './UI.js';

export default class Counter extends UI {
    constructor() {
        super();
        this.value = null;
        this.element = null;

        this.init();
    };
    init() {
        this.element = this.getElement(this.UiSelectors.counter);
    };
    setValue(value) {
        this.value = value;
        this.updateValue();
    };
    increment() {
        this.value++
        this.updateValue();
    };
    decrement() {
        this.value--
        this.updateValue();
    };
    updateValue() {
        this.element.textContent = this.value;
    };
};