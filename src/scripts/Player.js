import Gameboard from "./Gameboard"

export default class Player {
    #gameboard;
    #indexPlayed;

    constructor(board_size = 10) {
        this.#gameboard = new Gameboard(board_size);
        this.#indexPlayed = [];
    }

    play(gameboard, index) {
        if (this.#indexPlayed.length === gameboard.getBoard().length) {
            throw new Error('All shots have been played');
        }
        const isHit = gameboard.receiveAttack(index);
        this.#indexPlayed.push(index);
        return isHit;
    }

    getGameboard() {
        return this.#gameboard;
    }

    generateRandomIndexToPlay(gameboard) {
        if (this.#indexPlayed.length === gameboard.getBoard().length) {
            throw new Error('All shots have been played');
        }

        const boardSize = gameboard.getBoard().length;
        let index = Math.floor(Math.random() * boardSize);

        while (this.#indexPlayed.includes(index)) {
            index = Math.floor(Math.random() * boardSize);
        }
        return index;
    }

    randomPlay(gameboard) {
        const index = this.generateRandomIndexToPlay(gameboard);
        const isHit = this.play(gameboard, index);
        return { isHit, index }
    }

    getPlayedIndexes() {
        return this.#indexPlayed;
    }
}
