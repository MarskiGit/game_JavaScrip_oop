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
        this.#enemies.forEach((enemy, enemyIndex, enemiesArr) => {
            const enemyPosition = {
                top: enemy.element.offsetTop,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
            };
            if (enemyPosition.top > window.innerHeight) {
                enemy.explode();
                enemiesArr.splice(enemyIndex, 1);
            }
            this.#ship.missiles.forEach((missile, missileIndex, missileArr) => {
                const missilePosition = {
                    top: missile.element.offsetTop,
                    right: missile.element.offsetLeft + missile.element.offsetWidth,
                    bottom: missile.element.offsetTop + missile.element.offsetHeight,
                    left: missile.element.offsetLeft,
                };
                if (
                    missilePosition.bottom >= enemyPosition.top &&
                    missilePosition.top <= enemyPosition.bottom &&
                    missilePosition.right >= enemyPosition.left &&
                    missilePosition.left <= enemyPosition.right
                ) {
                    enemy.hit();
                    if (!enemy.lives) {
                        enemiesArr.splice(enemyIndex, 1);
                    }
                    missile.remove();
                    missileArr.splice(missileIndex, 1);
                }
                if (missilePosition.bottom < 0) {
                    missile.remove();
                    missileArr.splice(missileIndex, 1);
                }
            });
        });
    }
    #randomNewEnemy() {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        randomNumber % 5
            ? this.#createNewEnemy(this.#htmlElements.container, this.#enemiesInterval, 'enemy', 'explosion')
            : this.#createNewEnemy(this.#htmlElements.container, this.#enemiesInterval * 2, 'enemy--big', 'explosion--big', 3);
    }

    #createNewEnemy(...params) {
        const enemy = new Enemy(...params);
        enemy.init();
        this.#enemies.push(enemy);
    }
}
window.onload = function () {
    const game = new Game();
    game.init();
};
