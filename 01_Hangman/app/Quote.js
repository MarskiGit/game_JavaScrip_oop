'use strict';
export default class Quote {
    constructor(text) {
        this.text = text;
        this.quessed = [];
    };
    getContent() {
        let content = '';
        for (const char of this.text) {
            if (char === ' ' || this.quessed.includes(char)) {
                content += char;
            } else {
                content += '_';
            };
        };
        return content;
    };
    guessGame(latter) {
        if (this.text.includes(latter)) {
            this.quessed.push(latter);
            return true;
        };
        return false;
    };
};