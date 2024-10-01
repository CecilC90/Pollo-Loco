/**
 * Represents a cloud object in the game.
 */
class Cloud extends MovableObject {

    height = 350;
    width = 700;
    y = 10;
    speed = 0.2;

    /**
     * Constructs a new Cloud object.
     * @param {string} imagePath - The path to the image of the cloud.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = Math.random() * 2300;
        this.animate();
    }

    /**
     * Animates the cloud.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
