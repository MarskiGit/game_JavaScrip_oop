import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import { DATALOADED_EVENT_NAME } from './Loader.esm.js';
import {
    gameLevels,
    EMPTY_BLOCK,
    GAME_BOARD_X_OFFSET,
    GAME_BOARD_Y_OFFSET,
} from './gameLevels.esm.js';
import { canvas } from './Canvas.esm.js';
import { media } from './Media.esm.js';
import { Diamond } from './Diamond.esm.js';
import { GameState } from './GameState.esm.js';

const gameState = {
    pointsToWin: 7000,
    getPlayerPoints: () => 1000,
    getLeftMovement: () => 30,
};

class Game extends Common {
    constructor() {
        super();
    }
    playLavel(level) {
        const { numberOfMovements, pointsToWin, board } = gameLevels[level - 1];
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLavel);
        this.gameState = new GameState(
            level,
            numberOfMovements,
            pointsToWin,
            board,
            media.diamondsSprite
        );
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.animate();
    }
    animate() {
        canvas.drawGameOnCanvas(gameState);
        this.gameState.getGameBoard().forEach((diamond) => diamond.draw());
        this.animationFrame = window.requestAnimationFrame(() =>
            this.animate()
        );
    }
    getLeftMovement() {}
}

export const game = new Game();
