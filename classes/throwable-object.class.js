class ThrowableObject extends MovableObject {
    IMAGES_THROWING = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Constructor for ThrowableObject class.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {boolean} otherDirection - Flag indicating the direction of the object.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.loadImages(this.IMAGES_THROWING);
    }

 /**
 * Throws the throwable object.
 */
throw() {
    if (this.otherDirection) {
        this.throwLeft();
    } else {
        this.throwRight();
    }
}

/**
 * Throws the throwable object to the left.
 */
throwLeft() {
    this.speedY = 30;
    super.applayGravity();
    setInterval(() => {
        this.x -= 10;
        this.playAnimation(this.IMAGES_THROWING);
    }, 50);
}

/**
 * Throws the throwable object to the right.
 */
throwRight() {
    this.speedY = 30;
    super.applayGravity();
    setInterval(() => {
        this.x += 10;
        this.playAnimation(this.IMAGES_THROWING);
    }, 50);
}

}
