/**
 * Represents a level in the game.
 */
class Level {

    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2250;

    /**
     * Creates an instance of Level.
     * @param {MovableObject[]} enemies - Array of enemies in the level.
     * @param {MovableObject[]} clouds - Array of clouds in the level.
     * @param {BackroundObject[]} backgroundObjects - Array of background objects in the level.
     * @param {Coin[]} coins - Array of coins in the level.
     * @param {Bottle[]} bottles - Array of bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
