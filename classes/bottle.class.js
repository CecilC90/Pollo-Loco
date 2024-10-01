/**
 * Represents a bottle object in the game.
 */
class Bottle extends MovableObject {

/**
     * The offset values for collision detection.
     * @type {Object}
     */
offset = {
    top: 15,
    left: 20,
    right: 30,
    bottom: 20,
};

    /**
     * Constructs a new Bottle object.
     */
    constructor() {
        super();
        this.y = 360;
        this.height = 60;
        this.width = 50;
        this.currentImageIndex = 0;

        /**
         * The array of image paths for the bottle.
         * @type {string[]}
         */
        this.IMAGES = [
            './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ];

        /**
         * The array of image paths for the bottle splash animation.
         * @type {string[]}
         */
        this.IMAGES_SPLASH = [
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ];

        // Load initial image and set initial position
        this.loadImage(this.IMAGES[this.currentImageIndex]);
        this.x = 400 + Math.random() * 1800;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES.length;
    }
}
