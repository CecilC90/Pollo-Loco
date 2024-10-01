/**
 * Represents a character object in the game.
 */
class Character extends MovableObject {

    speed = 7;
    y = 220;
    mute = false;
    jumpstart;

    /**
     * The offset values for collision detection.
     * @type {Object}
     */
    offset = {
        top: 80,
        left: 20,
        right: 50,
        bottom: 85,
    };

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ]


    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
      //  './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths for hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * The world object.
     * @type {Object}
     */
    world;

    /**
     * The audio for walking sound.
     * @type {Audio}
     */
    walking_sound = new Audio('./audio/walking_sound.mp3');

    /**
     * The audio for jumping sound.
     * @type {Audio}
     */
    jumping_sound = new Audio('./audio/jump_sound.mp3');

    /**
     * The audio for hurting sound.
     * @type {Audio}
     */
    hurting_sound = new Audio('./audio/hurt_sound.mp3');

    /**
     * Constructs a new Character object.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applayGravity();
        this.animate();
    }

    /**
     * Animates the character.
     */
    animate() {
        this.startMovingAndJumping();
        this.startAnimationBasedOnState();
    }

    /**
     * Starts the intervals for character movement and jumping.
     */
    startMovingAndJumping() {
        setStoppableInterval(() => {
            this.handleCharacterMovement();
        }, 1000 / 60);
    }

    /**
     * Handles character movement and jumping.
     */
    handleCharacterMovement() {
        this.handleWalkingSound();
        this.handleCharacterDirection();
        this.adjustCamera();
    }

    /**
     * Handles character walking sound.
     */
    handleWalkingSound() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        }
        if (this.world.keyboard.LEFT && this.x > -100) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        }
    }

    /**
     * Plays the character's walking sound.
     */
    playWalkingSound() {
        if (!mute) {
            this.walking_sound.play();
        }
    }

    /**
     * Handles character direction based on keyboard input.
     */
    handleCharacterDirection() {
        if (this.x >= 20) {
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Adjusts the camera position based on character movement.
     */
    adjustCamera() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.playJumpingSound();
        }
    }

    /**
     * Plays the character's jumping sound.
     */
    playJumpingSound() {
        if (!mute) {
            this.jumping_sound.play();
        }
    }


    /**
     * Starts the intervals for character animation based on its state.
     */
    startAnimationBasedOnState() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.handleDeathAnimation();
            } else if (this.isHurt()) {
                this.handleHurtAnimation();
            } else if (this.isAboveGround()) {
                this.handleJumpingAnimation();
            } else {
                this.handleWalkingOrIdleAnimation();
            }
        }, 200);
    }

    /**
     * Handles character death animation.
     */
    handleDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            gameLost();
        }, 50);
    }

    /**
     * Handles character hurt animation.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        if (!mute) {
            this.hurting_sound.play();
        }
    }

    /**
     * Handles character jumping animation.
     */
    handleJumpingAnimation() {
        if(this.jumpstart) {
            this.currentImage = 0;
            this.jumpstart = false;
        }
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * Handles character walking or idle animation.
     */
    handleWalkingOrIdleAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Makes the character jump.
     */
    jump() {
        this.jumpstart = true;
        this.speedY = 30;
    }
}
