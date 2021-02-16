import { Diamond } from './Diamond.esm.js';

export class GameState {
    constructor(
        level,
        leftMovement,
        pointsToWin,
        diamonds,
        diamondsSpriteimage
    ) {
        let _leftMovement = leftMovement;
        let _playerScores = 0;
        let _gameBoard = diamonds.map((diamond) => new Diamond(...diamond));
        this._pointsToWin = pointsToWin;
        this._level = level;

        this.getLeftMovement = () => _leftMovement;
        this.decreasePointsMovement = () => _leftMovement--;
        this.increasePointsMovement = () => _leftMovement++;
        this.getPlayerPoints = () => _playerScores;
        this.icresasePlayerpoints = (points) => (_playerScores += points);

        this.isPlayerWinner = () => _playerScores >= this._pointsToWin;
    }
    get level() {
        return this._level;
    }
    get pointsToWin() {
        return this._pointsToWin;
    }
}
