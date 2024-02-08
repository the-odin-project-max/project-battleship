import Gameboard from "./scripts/Gameboard.js";

let gameboard = new Gameboard(10);

gameboard.placeShip(4, 0, "horizontal");
gameboard.placeShip(4, 10, "vertical");
gameboard.placeShip(3, 11, "vertical");

gameboard.receiveAttack(0);
gameboard.receiveAttack(12);

console.log(gameboard.getHits()); // 1
console.log(gameboard.display());