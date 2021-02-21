import { Common, HIDDEN_CLASS, VISIBLE_SCREEN } from './Common.esm.js';
import { levelSelect } from './LevelSelect.esm.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './Canvas.esm.js';
import { settings } from './Settings.esm.js';

export const SCALE_PROPERTY = '--scale-value';

const selectors = {
    MINI_SETTINGS_BUTTON: 'js-mini-settings-button',
    MINI_SETTINGS_LAYER: 'js-mini-settings-layer',
    START_SCREEN_GAME_BUTTON: 'js-start-game',
    START_SCREEN: 'js-start-screen',
    START_SCREEN_SETTINGS_BUTTON: 'js-settings-button',
};

class MainMenu extends Common {
    constructor() {
        super(selectors.START_SCREEN);
        this.bindToGameElements();
        this.resizeGameWindow();
        window.addEventListener('resize', this.debounced(this.resizeGameWindow, 500));
    }
    bindToGameElements() {
        const gameStartButton = this.bindToElement(selectors.START_SCREEN_GAME_BUTTON);
        const gameSettingsButton = this.bindToElement(selectors.START_SCREEN_SETTINGS_BUTTON);
        const miniSettingsButtonElement = this.bindToElement(selectors.MINI_SETTINGS_BUTTON);

        this.miniSettingsLayerElement = this.bindToElement(selectors.MINI_SETTINGS_LAYER);

        gameStartButton.addEventListener('click', () => this.showLevelScreen());
        gameSettingsButton.addEventListener('click', () => this.showSettingsScreen());
        miniSettingsButtonElement.addEventListener('click', () => this.showSettingsScreen());
    }
    showLevelScreen() {
        levelSelect.createButtons();
        this.changeVisibilityScreen(this.element, HIDDEN_CLASS);
        this.changeVisibilityScreen(levelSelect.element, VISIBLE_SCREEN);
    }
    showSettingsScreen() {
        this.changeVisibilityScreen(settings.element, VISIBLE_SCREEN);
    }
    resizeGameWindow() {
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT);
        document.documentElement.style.setProperty(SCALE_PROPERTY, scale.toFixed(2));
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
