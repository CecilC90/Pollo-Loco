/**
 * Represents a coin object in the game.
 */
class Coin extends MovableObject {

    x = 10;
    height = 150;

    width = 150;

    /**
     * The offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 50,
        left: 50,
        right: 100,
        bottom: 100,
    };

    /**
     * Constructs a new Coin object.
     */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 2000;
        this.y = 100 + Math.random() * 200;
        
    }
}
