
import Gameboard from '../src/scripts/Gameboard';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard(100);
    });

    afterEach(() => {
        gameboard = null;
    });

    test('gameboard has no ships when initialized', () => {
        expect(gameboard.getShips()).toEqual([]);
    });

    test("gameboard can't place ships outside of the board", () => {
        let ship_length = 4;
        expect(() => gameboard.placeShip(ship_length, 99, "horizontal")).toThrow('Ship out of bounds');
        expect(() => gameboard.placeShip(ship_length, 10001, "horizontal")).toThrow('Ship out of bounds');
        expect(() => gameboard.placeShip(ship_length, 10001, "vertical")).toThrow('Ship out of bounds');
        expect(() => gameboard.placeShip(ship_length, 9900, "vertical")).toThrow('Ship out of bounds');
    });

    test("gameboard can't place ships with invalid length", () => {
        expect(() => gameboard.placeShip(0, 0, "horizontal")).toThrow('Invalid ship length');
        expect(() => gameboard.placeShip(101, 0, "horizontal")).toThrow('Invalid ship length');
        expect(() => gameboard.placeShip("stringInsteadOfNumber", 0, "horizontal")).toThrow('Invalid ship length');
    });

    test("gameboard can't place overlapping ships", () => {
        gameboard.placeShip(4, 0, "horizontal");
        expect(() => gameboard.placeShip(4, 1, "horizontal")).toThrow('Ship overlapping');
    });

    test('gameboard can place ships', () => {
        gameboard.placeShip(4, 0, "horizontal");
        expect(gameboard.getShips()[0].coordinates).toEqual([0, 1, 2, 3]);
        gameboard.placeShip(4, 100, "vertical");
        expect(gameboard.getShips()[1].coordinates).toEqual([100, 200, 300, 400]);
        gameboard.placeShip(3, 101, "vertical");
        expect(gameboard.getShips()[2].coordinates).toEqual([101, 201, 301]);
    });

    test('gameboard can receive attack', () => {
        gameboard.placeShip(3, 0, "vertical");
        expect(gameboard.receiveAttack(0)).toBe(true);
        expect(gameboard.getHits()).toBe(1);
        expect(gameboard.getShips()[0].ship.isSunk()).toBe(false);

    });

    test('gameboard can receive missed attack', () => {
        gameboard.placeShip(3, 0, "horizontal");
        gameboard.receiveAttack(4);
        expect(gameboard.getMisses()).toBe(1);
    });

    test('gameboard throw error if attack is out of bounds', () => {
        expect(() => gameboard.receiveAttack(10001)).toThrow('Invalid attack');
    });

    test('gameboard throw error if there are two attacks at same spot', () => {
        gameboard.placeShip(3, 0, "vertical");
        gameboard.receiveAttack(0);
        expect(() => gameboard.receiveAttack(0)).toThrow('Already attacked at this spot');
    });


    test('gameboard can sunk ship', () => {
        gameboard.placeShip(3, 0, "vertical");
        gameboard.receiveAttack(0);
        expect(gameboard.getHits()).toBe(1);
        expect(gameboard.getShips()[0].ship.isSunk()).toBe(false);
        gameboard.receiveAttack(100);
        gameboard.receiveAttack(200);
        expect(gameboard.getShips()[0].ship.isSunk()).toBe(true);
    });

    test('gameboard can return missed shots', () => {
        gameboard.placeShip(3, 0, "vertical");
        gameboard.receiveAttack(4);
        expect(gameboard.getMissedShots()).toEqual([4]);
    });

    test('gameboard can return game over', () => {
        gameboard.placeShip(4, 0, "horizontal");
        gameboard.receiveAttack(0);
        gameboard.receiveAttack(1);
        gameboard.receiveAttack(2);
        gameboard.receiveAttack(3);
        expect(gameboard.getGameOver()).toBe(true);
    });

    test('gameboard can return not game over', () => {
        gameboard.placeShip(4, 0, "horizontal");
        gameboard.receiveAttack(0);
        gameboard.receiveAttack(1);
        gameboard.receiveAttack(2);
        expect(gameboard.getGameOver()).toBe(false);
    });
});