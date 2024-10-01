/**
 * Represents a background object in the game.
 * Extends the MovableObject class.
 */
class BackroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Constructs a new background object.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;  
    }
}
