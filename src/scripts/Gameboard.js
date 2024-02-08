import Ship from './Ship';

export default class Gameboard {
    #ships;
    #hits;
    #misses;
    #missedShots;
    #board;
    #board_size;

    constructor(board_size = 100) {
        if (board_size < 10 || board_size > 100) {
            throw new Error('Invalid board size');
        }
        this.#board_size = board_size;
        this.#board = Array(this.#board_size ** 2).fill(null);
        this.#ships = [];
        this.#hits = 0;
        this.#misses = 0;
        this.#missedShots = [];
    }

    getShips() {
        return this.#ships;
    }

    getHits() {
        return this.#hits;
    }

    getMisses() {
        return this.#misses;
    }

    getMissedShots() {
        return this.#missedShots;
    }

    getGameOver() {
        return this.#ships.every((ship) => ship.ship.isSunk());
    }

    getBoardSize() {
        return this.#board_size;
    }

    getCoordinatesFromIndex(index) {
        let x = index % this.#board_size; // Horizontal coordinate
        let y = Math.floor(index / this.#board_size); // Vertical coordinate
        return { x: x, y: y };
    }

    getIndexFromCoordinates(x, y) {
        return y * this.#board_size + x;
    }

    placeShip(ship_length, index, direction = 'horizontal') {
        if (ship_length < 1 || ship_length > 5 || typeof (ship_length) !== 'number') {
            throw new Error('Invalid ship length');
        }

        if (index < 0 || index > this.#board_size ** 2) {
            throw new Error('Ship out of bounds');
        }

        let { x: shipStartX, y: shipStartY } = this.getCoordinatesFromIndex(index);

        // If the ship is placed horizontally, the x coordinate is incremented by the size of the ship
        // If the ship is placed vertically, the y coordinate is incremented by the size of the ship
        let shipEndX = direction === 'horizontal' ? shipStartX + ship_length - 1 : shipStartX;
        let shipEndY = direction === 'vertical' ? shipStartY + ship_length - 1 : shipStartY;


        if (shipEndX >= this.#board_size || shipEndY >= this.#board_size) {
            throw new Error('Ship out of bounds');
        }

        // Check no ship is already placed in the coordinates
        for (let i = 0; i < ship_length; i++) {
            let x = direction === 'horizontal' ? shipStartX + i : shipStartX;
            let y = direction === 'vertical' ? shipStartY + i : shipStartY;
            let index = this.getIndexFromCoordinates(x, y);

            if (this.#board[index]) {
                throw new Error('Ship overlapping');
            }
        }

        // Create the ship and place it in the board
        let ship = new Ship(ship_length);

        let coordinates = [];
        for (let i = 0; i < ship_length; i++) {
            let x = direction === 'horizontal' ? shipStartX + i : shipStartX;
            let y = direction === 'vertical' ? shipStartY + i : shipStartY;
            let index = this.getIndexFromCoordinates(x, y);
            this.#board[index] = ship;
            coordinates.push(index);
        }
        this.#ships.push({ ship: ship, coordinates: coordinates });
    }

    receiveAttack(indexHit) {
        if (indexHit < 0 || indexHit > this.#board_size ** 2) {
            throw new Error('Invalid attack');
        }

        if (this.#board[indexHit] === 'missed' || this.#board[indexHit] === 'hit') {
            throw new Error('Already attacked at this spot');
        }
        // const shipHit = this.#ships.find((ship) => ship.coordinates.includes(indexHit)).ship;
        const shipHit = this.#board[indexHit];

        if (shipHit) {
            shipHit.hit();
            this.#board[indexHit] = 'hit';
            this.#hits++;
            return true;
        } else {
            this.#misses++;
            this.#missedShots.push(indexHit);
            this.#board[indexHit] = 'missed';
            return false;
        }
    }

    getBoard() {
        return this.#board;
    }

    display() {
        let board = '';
        for (let i = 0; i < this.#board_size ** 2; i++) {
            if (i % this.#board_size === 0) {
                board += '\n';
            }
            if (this.#board[i] === 'hit') {
                board += 'X ';
            } else if (this.#board[i] === 'missed') {
                board += 'O ';
            } else if (this.#board[i] === null) {
                board += '. ';
            } else {
                board += 'S ';
            }
        }
        return board;
    }
}
