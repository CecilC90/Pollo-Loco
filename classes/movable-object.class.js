/**
 * Represents a movable object in the game.
 */
class MovableObject extends DrawableObject {

    currentImageHurt = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coinStatus = 0;
    bottleStatus = 0;
    lastHit = 0;
    EndbossEnergy = 100;
    lastHitBoss = 0;

    /**
     * Defines the offset for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
     * Applies gravity to the object's vertical movement.
     */
    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (!this.isAboveGround() && this.speedY < 0) {
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 200;
        }
    }


    /**
 * Checks if this object is colliding with another movable object.
 * @param {MovableObject} mo - The other movable object to check collision with.
 * @returns {boolean} True if the objects are colliding, false otherwise.
 */
    isColliding(mo) {
        return (this.x + this.offset.left) + (this.width - this.offset.right) >= mo.x + mo.offset.left&&
               (this.x + this.offset.left) <= (mo.x + mo.width - mo.offset.right) &&
               (this.y + this.offset.top) + (this.height - this.offset.bottom) >= mo.y &&
               (this.y + this.offset.top) <= (mo.y + mo.height - mo.offset.bottom);
    }
    
    /**
     * Checks if the object is falling (moving upwards).
     * @returns {boolean} True if the object is falling, false otherwise.
     */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Decreases the energy level of the object when it gets hit.
     */
    hit() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Checks if the boss object is currently hurt.
     * @returns {boolean} True if the boss object is hurt, false otherwise.
     */
    isBossHurt() {
        let timePassed = new Date().getTime() - this.lastHitBoss;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Checks if the object is dead (energy level is zero).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Decreases the energy level of the end boss when hit by the object.
     */
    hitBoss() {
        this.EndbossEnergy -= 20;
        if (this.EndbossEnergy < 0) {
            this.EndbossEnergy = 0;
        } else {
            this.lastHitBoss = new Date().getTime();
        }
    }

    /**
     * Increases the bottle status of the object.
     */
    getBottle() {
        this.bottleStatus += 20;
        if (this.bottleStatus > 100) {
            this.bottleStatus = 100;
        } else {
            this.lastBottle = new Date().getTime();
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays animation for the object using provided images.
     * @param {string[]} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}