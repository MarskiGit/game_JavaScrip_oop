'use strict';
import Quote from './Quote.js';
class Game {

    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper
    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;
        this.currentStep = 0;
        this.lastStep = 7;
        this.quotes = [{
                text: "pan tadeusz",
                category: "Utwór literacki",
            },
            {
                text: "janko muzykant",
                category: "Utwór literacki",
            },
            {
                text: "akademia pana kleksa",
                category: "Film",
            },
            {
                text: "ogniem i mieczem",
                category: "Utwór literacki",
            },
        ];
        const {
            text,
            category
        } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    };
    guess(latter, event) {
        event.target.disabled = true;
        if (this.quote.guessGame(latter)) {
            this.drawQuoute();
        } else {
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
            if (this.currentStep === this.lastStep) this.loosing();
        };

    };
    drawLatters() {
        for (let i = 10; i < 36; i++) {
            const label = (i).toString(36);
            const btn = document.createElement('button');
            btn.innerHTML = label;
            btn.addEventListener('click', (event) => this.guess(label, event))
            this.lettersWrapper.appendChild(btn);
        };
    };
    drawQuoute() {
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) this.winning();
    };
    start() {
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        this.drawLatters();
        this.drawQuoute();
    };
    winning() {
        this.wordWrapper.innerHTML = "You win! End Game";
        this.lettersWrapper.innerHTML = '';
    };
    loosing() {
        this.wordWrapper.innerHTML = "You lost! End Game";
        this.lettersWrapper.innerHTML = '';
    };
};

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output')
});
game.start();