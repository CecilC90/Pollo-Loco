/**
 * Represents a chicken object in the game.
 */
class SmallChicken extends MovableObject {

    y = 380;
    height = 30;
    width = 40;

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * The image path for dead state.
     * @type {string}
     */
    IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * The audio for chicken sound.
     * @type {Audio}
     */
    chicken_sound = new Audio('./audio/chicken_sound.mp3');

    /**
     * Constructs a new Chicken object.
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 2300;
        this.speed = 0.2 + Math.random() * 0.45;
        this.animate();
        this.isDead = false;
        this.soundPlayed = false;
    }

    /**
 * Animates the chicken.
 */
    animate() {
        this.startMovingLeft();
        this.startWalkingAnimation();
        this.startDeathAnimation();
    }

    /**
     * Starts the interval for moving the chicken to the left.
     */
    startMovingLeft() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Starts the walking animation of the chicken.
     */
    startWalkingAnimation() {
        setStoppableInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Starts the death animation of the chicken.
     */
    startDeathAnimation() {
        setStoppableInterval(() => {
            if (this.isDead && !this.soundPlayed) {
                this.y += 5;
                this.loadImage(this.IMAGE_DEAD);
                this.playDeathSound();
                this.soundPlayed = true;
                this.resetDeathSound();
            }
        }, 200);
    }

    /**
     * Plays the sound of the chicken's death.
     */
    playDeathSound() {
        if (!mute) {
            this.chicken_sound.play();
        }
    }

    /**
     * Resets the chicken's death sound after a delay.
     */
    resetDeathSound() {
        setTimeout(() => {
            this.stopDeathSound();
        }, 1000);
    }

    /**
     * Stops the chicken's death sound.
     */
    stopDeathSound() {
        this.chicken_sound.pause();
        this.chicken_sound.currentTime = 0;
    }

}
