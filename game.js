/**
 * Represents the canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents the game world.
 * @type {World}
 */
let world;

/**
 * Array to store interval IDs for stoppable intervals.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Represents the mute state of the game.
 * @type {boolean}
 */
let mute = false;

/**
 * Sets an interval that can be stopped.
 * @param {Function} fn - The function to execute.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Initializes the canvas element.
 */
function init() {
    canvas = document.getElementById('canvas');
}

/**
 * Starts the game.
 */
function startGame() {
    let keyboard = new Keyboard();
    document.getElementById('hud').style.display = 'flex';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    initLevel();
    world = new World(canvas, keyboard);
}

/**
 * Stops the game.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    world.background_music_player.stop();
}

/**
 * Displays the game over screen.
 */
function gameOver() {
    document.getElementById('gameOverScreen').style.display = 'flex';
    document.getElementById('hud').style.display = 'none';
    stopGame();
}

/**
 * Displays the game lost screen.
 */
function gameLost() {
    document.getElementById('gamelose').style.display = 'flex';
    document.getElementById('hud').style.display = 'none';
    stopGame();
}

/**
 * Restarts the game.
 */
function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('gamelose').style.display = 'none';
    document.getElementById('hud').style.display = 'flex';
    startGame();
    world.background_music_player.play();
}

/**
 * Toggles the background music on/off.
 */
function toggleBackgroundMusic() {
    const soundIcon = document.getElementById('soundIcon');
    if (world && world.background_music_player) {
        if (world.background_music_player.audio.paused) {
            world.background_music_player.play();
            soundIcon.src = "./img/sound_icon.png"; // Change the icon to speaker symbol when music is played
            mute = false;
        } else {
            world.background_music_player.pause();
            mute = true;
            soundIcon.src = "./img/mute_icon.png"; // Change the icon to mute symbol when music is paused
        }
    }
}
