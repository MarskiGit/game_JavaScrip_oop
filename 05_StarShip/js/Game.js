import { Enemy } from './Enemy.js';
import { Spaceship } from './Spaceship.js';

class Game {
    #htmlElements = {
        spaceship: document.querySelector('[data-spaceship]'),
        container: document.querySelector('[data-container]'),
    };
    #ship = new Spaceship(this.#htmlElements);
    #enemies = [];
    #enemiesInterval = null;
    #checkPositionInterval = null;
    #createEnemyInterval = null;

    init() {
        this.#enemiesInterval = 30;
        this.#ship.init();
        this.#newGame();
    }
    #newGame() {
        this.#createEnemyInterval = setInterval(() => this.#randomNewEnemy(), 1000);
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
    }
    #checkPosition() {
        this.#ship.missiles.forEach((missile, missileIndex, missileArr) => {
            const missilePosition = {
                top: missile.element.offsetTop,
                right: missile.element.offsetLeft + missile.element.offsetWidth,
                bottom: missile.element.offsetTop + missile.element.offsetHeight,
                left: missile.element.offsetLeft,
            };
            if (missilePosition.bottom < 0) {
                missile.remove();
                missileArr.splice(missileIndex, 1);
            }
        });
        this.#enemies.forEach((enemy, enemyIndex, enemiesArr) => {
            const enemyPosition = {
                top: enemy.element.offsetTop,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
            };
            if (enemyPosition.top > window.innerHeight) {
                enemy.remove();
                enemiesArr.splice(enemyIndex, 1);
            }
        });
    }
    #randomNewEnemy() {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        randomNumber % 5 ? this.#createNewEnemy('enemy') : this.#createNewEnemy('enemy--big', 2, 3);
    }
    #createNewEnemy(enemyShip, speed = 1, lives = 1) {
        const enemy = new Enemy(this.#htmlElements, this.#enemiesInterval * speed, enemyShip, lives);
        enemy.init();
        this.#enemies.push(enemy);
    }
}

window.onload = function () {
    const game = new Game();
    game.init();
};
