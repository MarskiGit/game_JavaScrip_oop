import { Common, VISIBLE_SCREEN, HIDDEN_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { mainMenu } from './MainMenu.esm.js';
// import { userData } from './UserData.esm.js';
import { levelSelect } from './LevelSelect.esm.js';
import { game } from './Game.esm.js';

const ID = {
    RESULT_SCREEN_BACK_BUTTON: 'js-back-to-levels',
    RESULT_SCREEN_END_SCREEN: 'js-end-screen',
    RESULT_SCREEN_GAME_WIN: 'end-screen--is-win',
    RESULT_SCREEN_HEADER: 'js-game-result',
    RESULT_SCREEN_HIGH_SCORES: 'js-high-scores',
    RESULT_SCREEN_RESTART_LEVEL_BUTTON: 'js-restart-level',
    RESULT_SCREEN_USER_POINTS: 'js-user-points',
};

class ResultScreen extends Common {
    constructor() {
        super(ID.RESULT_SCREEN_END_SCREEN);
        this.bindToElements();
    }
    bindToElements() {
        this.resultTextElement = this.bindToElement(ID.RESULT_SCREEN_HEADER);
        this.userPointsElement = this.bindToElement(ID.RESULT_SCREEN_USER_POINTS);
        this.highScoresElement = this.bindToElement(ID.RESULT_SCREEN_HIGH_SCORES);

        const backButtonElement = this.bindToElement(ID.RESULT_SCREEN_BACK_BUTTON);
        const restartButtonElement = this.bindToElement(ID.RESULT_SCREEN_RESTART_LEVEL_BUTTON);

        backButtonElement.addEventListener('click', () => this.backButtonClick());
        restartButtonElement.addEventListener('click', () => this.restartLevelClick());
    }
    viewREsultScreen(isGameWin, playerPoints, level) {
        if (isGameWin) {
            this.element.classList.add(ID.RESULT_SCREEN_GAME_WIN);
        } else {
            this.element.classList.remove(ID.RESULT_SCREEN_GAME_WIN);
        }
        this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
        this.resultTextElement.textContent = isGameWin ? 'WWYGRAŁEŚ !' : 'PRZEGRAŁEŚ';
        this.userPointsElement.textContent = `${playerPoints}`;
        this.highScoresElement.textContent = 7000;
    }
}

export const resultScreen = new ResultScreen();
