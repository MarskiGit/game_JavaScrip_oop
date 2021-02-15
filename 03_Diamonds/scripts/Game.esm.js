import { Common } from './Common.esm.js';
import { gameLevels } from './gameLevels.esm.js';
import { DATALOADED_EVENT_NAME } from './Loader.esm.js';

class Game extends Common {
    constructor() {
        super();
    }
    playLavel(level) {
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLavel);
        const levelInfo = gameLevels[level - 1];
        this.animate();
    }
    animate() {
        console.log('Lets game');
        this.animationFrame = window.requestAnimationFrame(() =>
            this.animate()
        );
    }
}

export const game = new Game();
