import {
    Common,
    HIDDEN_SCREEN,
    VISIBLE_SREEN
} from './Common.esm.js';

const SCALE_PROPERTY = '--scale-value';
const START_SCREEN_SETINGS_BUTTON_ID = 'js-settings-button';
const START_SCREEN_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_ID = 'js-start-screen';


class MainMenu extends Common {
    constructor() {
        super(START_SCREEN_ID);
        this.bindToGameElements();
        this.resizeGameWindow();
        window.addEventListener('resize', this.debounced(this.resizeGameWindow, 500))

    };
    bindToGameElements() {
        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(START_SCREEN_SETINGS_BUTTON_ID);

        gameStartButton.addEventListener('click', this.showLevelScreen);
        gameSettingsButton.addEventListener('click', this.showSettingsScreen)
    };
    showLevelScreen() {
        console.log('wybód poziomu')
    };
    showSettingsScreen() {
        console.log('ustawienia gry')
    };
    resizeGameWindow() {
        const {
            innerWidth: width,
            innerHeight: height
        } = window;
        const scale = Math.min(width / 640, height / 480) * 1.1;
        document.documentElement.style.setProperty(SCALE_PROPERTY, scale.toFixed(2));
    };
    debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), l = setTimeout(() => f.apply(c, a), t);
        };
    };
};

export const mainMenu = new MainMenu();