
import Player from '../src/scripts/Player';
import Gameboard from '../src/scripts/Gameboard';

describe('One Player', () => {
    let player;

    beforeEach(() => {
        player = new Player(10);
    });

    afterEach(() => {
        player = null;
    });

    test('player has a gameboard', () => {
        expect(player.getGameboard()).toBeInstanceOf(Gameboard);
    });
});

describe('Two Players', () => {
    let playerOne;
    let playerTwo;

    beforeEach(() => {
        playerOne = new Player(10);
        playerTwo = new Player(10);
    });

    afterEach(() => {
        playerOne = null;
        playerTwo = null;
    });

    test('Player can play on another player board', () => {
        playerTwo.getGameboard().placeShip(4, 0, 'horizontal');
        playerOne.play(playerTwo.getGameboard(), 0);

        expect(playerTwo.getGameboard().getBoard()[0]).toBe('hit');
        expect(playerTwo.getGameboard().getHits()).toBe(1);
    });

    test('Player can play randomly on another player board', () => {
        playerTwo.getGameboard().placeShip(1, 0, 'horizontal');
        const { isHit, index } = playerOne.randomPlay(playerTwo.getGameboard());

        expect(playerTwo.getGameboard().getBoard()[index]).toBe(isHit ? 'hit' : 'missed');
    });

    test('Player cannot play on another player board if all shots have been played', () => {
        playerTwo.getGameboard().placeShip(1, 0, 'horizontal');
        for (let i = 0; i < 100; i++) {
            playerOne.play(playerTwo.getGameboard(), i);
        }

        expect(() => playerOne.play(playerTwo.getGameboard(), 0)).toThrow('All shots have been played');
    });
});
