/**
 * Class representing the game world.
 */
class World {

    character = new Character();
    endboss = new Endboss();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    background_music_player;
    mute = false;
    characterIsHit = false;
    throwCooldown = false;
    collisionTimeout = null;
    bottle_sound = new Audio('./audio/bottle_sound.mp3');
    coin_sound = new Audio('./audio/coin_sound.mp3');
    chicken_sound = new Audio('./audio/chicken_sound.mp3');

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard controller.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.characterIsHit = this.characterIsHit;
        this.keyboard = keyboard;
        this.draw();
        this.background_music_player = new BackgroundMusicPlayer('./audio/background_music.mp3');
        this.setWorld();
        this.run();
    }

    /**
     * Sets up the world.
     */
    setWorld() {
        this.character.world = this;
        if (!mute) {
            this.background_music_player.play();
        }
        this.endboss.world = this;
    }

    /**
     * Starts the game loop.
     */
    run() {
        setStoppableInterval(() => {
            this.checkSquashing();
            this.checkCollisions();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.checkCollisionsBottleAndEndboss();
            this.checkendbossDead();
            this.checkDistanceToEndboss();
        }, 16);

        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    /**
     * Checks if throwable objects are thrown.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottleStatus > 0 && !this.throwCooldown) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.removeBottle();
            this.throwCooldown = true;
            setTimeout(() => {
                this.throwCooldown = false;
            }, 800);
        }
    }

    /**
     * Checks the distance between the character and the endboss.
     */
    checkDistanceToEndboss() {
        if (this.character.x + 360 > this.endboss.x) {
            this.endboss.smallDistance = true;
        } else {
            this.endboss.smallDistance = false;
        }
    }

    /**
     * Removes a bottle from the character's inventory and updates the bottle status bar.
     */
    removeBottle() {
        this.character.bottleStatus -= 20;
        this.statusBarBottle.setPercentage(this.character.bottleStatus);
    }

    /**
  * Checks collisions between the character and enemies or the endboss.
  */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkEndbossCollision();
    }


    /**
     * Checks collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.isDead && this.character.isColliding(enemy)) {
                if (!this.characterIsHit) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    this.characterIsHit = true;
                    setTimeout(() => {
                        this.characterIsHit = false
                    }, 800);
                }
            }
        });
    }

    /**
     * Checks collision between the character and the endboss.
     */
    checkEndbossCollision() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if the character is squashing enemies.
     */
    checkSquashing() {
        setStoppableInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.isFalling()) {
                    enemy.isDead = true;
                    this.remove(enemy, this.level.enemies);
                }
            });
        }, 150);
    }

    /**
     * Checks collisions between the character and bottles.
     */
    checkCollisionsBottle() {
        setStoppableInterval(() => {
            this.level.bottles.forEach(bottle => {
                if (this.character.isColliding(bottle)) {
                    this.character.getBottle();
                    this.statusBarBottle.setPercentage(this.character.bottleStatus);
                    if (!mute) {
                        this.bottle_sound.play();
                    }
                    this.remove(bottle, this.level.bottles);
                }
            });
        }, 100);
    }

    /**
     * Checks collisions between throwable objects and the endboss.
     */
    checkCollisionsBottleAndEndboss() {
        setStoppableInterval(() => {
            this.throwableObjects.forEach(bottle => {
                if (this.endboss.isColliding(bottle)) {
                    this.remove(bottle, this.throwableObjects);
                    if (!mute) {
                        this.chicken_sound.play();
                    }
                    this.endboss.bossHurt = true;
                    this.endboss.endbossHurt();
                    this.statusBarEndboss.setPercentage(this.endboss.EndbossEnergy);
                }
            });
        }, 1000);
    }

    /**
     * Checks if the endboss is dead.
     */
    checkendbossDead() {
        setStoppableInterval(() => {
            if (this.endboss.EndbossEnergy === 0) {
                this.endboss.animateDead();
            }
        }, 600);
    }

    /**
     * Checks collisions between the character and coins.
     */
    checkCollisionsCoin() {
        setStoppableInterval(() => {
            this.level.coins.forEach(coin => {
                if (this.character.isColliding(coin)) {
                    this.character.coinStatus += 20;
                    this.statusBarCoin.setPercentage(this.character.coinStatus);
                    if (!mute) {
                        this.coin_sound.play();
                    }
                    this.remove(coin, this.level.coins);
                }
            });
        }, 100);
    }

    /**
     * Draws the game world including characters, objects, and status bars.
     */
    draw() {
        this.clearCanvas();

        this.ctx.translate(this.camera_x, 0);
        this.drawBackgroundObjects();
        this.ctx.translate(-this.camera_x, 0);

        this.drawFixedObjects();

        this.ctx.translate(this.camera_x, 0);
        this.drawMovableObjects();
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        
    }

    /**
     * Zeichnet die Hintergrundobjekte.
     */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Zeichnet die festen Objekte (Statusleisten).
     */
    drawFixedObjects() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Zeichnet die beweglichen Objekte (Charakter, Endboss, Feinde, werfbare Objekte).
     */
    drawMovableObjects() {
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Löscht den Canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    };

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {Object} mo - The object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the flipped image back to its original state.
     * @param {Object} mo - The object whose image needs to be reverted.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Removes an object from the specified object list.
     * @param {Object} object - The object to remove.
     * @param {Array} objectList - The list from which to remove the object.
     */
    remove(object, objectList) {
        if (object instanceof Chicken || object instanceof SmallChicken) {
            setTimeout(() => {
                const index = objectList.indexOf(object);
                if (index !== -1) {
                    objectList.splice(index, 1);
                }
            }, 400);
        } else {
            const index = objectList.indexOf(object);
            if (index !== -1) {
                objectList.splice(index, 1);
            }
        }
    }

    
}