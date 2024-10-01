/**
 * Represents an end boss in the game.
 */
class Endboss extends MovableObject {
 
    height = 400;
    width = 300;
    y = 55;
    speed = 2;

    /**
     * The offset for collision detection.
     * @type {Object}
     */
    offset = {
        top: 60,
        left: 0,
        right: 0,
        bottom: 70,
    };

    /**
     * Images for the walking animation of the end boss.
     * @type {string[]}
     */
    IMAGES_WALK = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png'
    ];

    /**
     * Images for the alert animation of the end boss.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Images for the hurt animation of the end boss.
     * @type {string[]}
     */
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Images for the dead animation of the end boss.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of Endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.x = 2500;
        this.smallDistance = false;
        this.attackInterval = null;
        this.moveLeftinterval = null;
        this.alertInterval = null;
        this.animate();
        this.bossHurt = false;
    }

    /**
  * Animates the end boss based on its behavior.
  */
    animate() {
        this.alertInterval = setInterval(() => {
            if (this.smallDistance) {
                this.walkAndAttack();
            } else {
                this.alert();
            }
        }, 200);
    }

    /**
     * Animates the end boss when it is in alert mode.
     */
    alert() {
        this.playAnimation(this.IMAGES_ALERT);
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }
    }

    /**
     * Animates the end boss when it is walking towards the player and attacking.
     */
    walkAndAttack() {
        this.playAnimation(this.IMAGES_WALK);
        if (!this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }
    }


    /**
     * Handles the animation for the end boss being hurt.
     */
    endbossHurt() {
        if (this.bossHurt) {
            this.hitBoss();
            let intervalID = setInterval(() => {
                this.playAnimation(this.IMAGES_HURT);
            }, 200);
            setTimeout(() => {
                clearInterval(intervalID);
                this.bossHurt = false;
            }, 500);
        }
    }

    /**
     * Animates the end boss when it is dead.
     */
    animateDead() {
        clearInterval(this.alertInterval);
        clearInterval(this.attackInterval);
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000);
        setTimeout(() => {
            gameOver();
        }, 1500);
    }

    /**
     * Checks for collisions with other objects.
     * @param {MovableObject[]} objects - An array of movable objects to check collisions with.
     */
    checkCollisions(objects) {
        objects.forEach(object => {
            if (!object.isDead() && this.isColliding(object)) {
                this.bossHurt = true;
            }
        });
    }
}
