import { Common, HIDDEN_CLASS, VISIBLE_SCREEN } from './Common.esm.js';
import { levelSelect } from './LevelSelect.esm.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './Canvas.esm.js';

const SCALE_PROPERTY = '--scale-value';
const START_SCREEN_SETINGS_BUTTON_ID = 'js-settings-button';
const START_SCREEN_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_ID = 'js-start-screen';

class MainMenu extends Common {
    constructor() {
        super(START_SCREEN_ID);
        this.bindToGameElements();
        this.resizeGameWindow();
        window.addEventListener(
            'resize',
            this.debounced(this.resizeGameWindow, 500)
        );
    }
    bindToGameElements() {
        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(
            START_SCREEN_SETINGS_BUTTON_ID
        );

        gameStartButton.addEventListener('click', () => this.showLevelScreen());
        gameSettingsButton.addEventListener('click', () =>
            this.showSettingsScreen()
        );
    }
    showLevelScreen() {
        this.changeVisibilityScreen(this.element, HIDDEN_CLASS);
        this.changeVisibilityScreen(levelSelect.element, VISIBLE_SCREEN);
    }
    showSettingsScreen() {
        console.log('ustawienia gry');
    }
    resizeGameWindow() {
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT);
        document.documentElement.style.setProperty(
            SCALE_PROPERTY,
            scale.toFixed(2)
        );
    }
    debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), (l = setTimeout(() => f.apply(c, a), t));
        };
    }
}

export const mainMenu = new MainMenu();
