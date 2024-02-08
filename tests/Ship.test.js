import Ship from '../src/scripts/Ship';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(4);
    });

    test('ship has a length', () => {
        expect(ship.getLength()).toBe(4);
    });

    test('ship can be hit', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('ship can be hit multiple times', () => {
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);
    });

    test('ship can be sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});