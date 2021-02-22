import { Card, Types, Weights } from './Card.esm.js';

export class Deck {
    constructor() {
        this.cards = [];
        Types.forEach((type) => Weights.forEach((weight) => this.cards.push(new Card(weight, type))));
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
        return this.cards;
    }
    pickOne = () => this.cards.pop();
}
