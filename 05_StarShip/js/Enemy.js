export class Enemy {
    constructor(elements, intervalTime, enemyClass, lives) {
        this.container = elements.container;
        this.element = document.createElement('div');
        this.enemyClass = enemyClass;
        this.intervalTime = intervalTime;
        this.interval = null;
        this.lives = lives;
    }
    init() {
        this.#setEnemy();
        this.#updatePosition();
    }
    #setEnemy() {
        this.element.classList.add(this.enemyClass);
        this.container.appendChild(this.element);
        this.element.style.top = '0px';
        this.element.style.left = `${this.#randomPosition()}px`;
    }
    #randomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }
    #updatePosition() {
        this.interval = setInterval(() => this.#setNewPosition(), this.intervalTime);
    }
    #setNewPosition() {
        this.element.style.top = `${this.element.offsetTop + 1}px`;
    }
    remove() {
        clearInterval(this.interval);
        this.element.remove();
    }
}
