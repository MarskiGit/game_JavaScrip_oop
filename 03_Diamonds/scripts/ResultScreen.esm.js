import { Common, VISIBLE_SCREEN, HIDDEN_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { mainMenu } from './MainMenu.esm.js';
import { levelSelect } from './LevelSelect.esm.js';
import { game } from './Game.esm.js';
import { userData } from './UserData.esm.js';

const selectors = {
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
        super(selectors.RESULT_SCREEN_END_SCREEN);
        this.bindToElements();
    }
    bindToElements() {
        this.resultTextElement = this.bindToElement(selectors.RESULT_SCREEN_HEADER);
        this.userPointsElement = this.bindToElement(selectors.RESULT_SCREEN_USER_POINTS);
        this.highScoresElement = this.bindToElement(selectors.RESULT_SCREEN_HIGH_SCORES);

        const backButtonElement = this.bindToElement(selectors.RESULT_SCREEN_BACK_BUTTON);
        const restartButtonElement = this.bindToElement(selectors.RESULT_SCREEN_RESTART_LEVEL_BUTTON);

        backButtonElement.addEventListener('click', () => this.backButtonClick());
        restartButtonElement.addEventListener('click', () => this.restartLevelClick());
    }
    viewResultScreen(isGameWin, playerPoints, level) {
        if (isGameWin) {
            this.element.classList.add(selectors.RESULT_SCREEN_GAME_WIN);
        } else {
            this.element.classList.remove(selectors.RESULT_SCREEN_GAME_WIN);
        }
        this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
        this.resultTextElement.textContent = isGameWin ? 'WWYGRAŁEŚ !' : 'PRZEGRAŁEŚ';
        this.userPointsElement.textContent = `${playerPoints}`;
        this.highScoresElement.textContent = `${userData.getHighScores(level)}`;
    }
    backButtonClick() {
        this.changeVisibilityScreen(canvas.element, HIDDDEN_SCREEN);
        this.changeVisibilityScreen(this.element, HIDDDEN_SCREEN);
        mainMenu.showLevelScreen();
    }
    restartLevelClick() {
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
        levelSelect.loadLevel(game.gameState.level);
    }
}

export const resultScreen = new ResultScreen();
