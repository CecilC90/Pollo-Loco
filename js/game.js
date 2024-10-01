let canvas;
let world;
let intervalIds = [];
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
}

/**
 * Toggles the background music on/off.
 */
function toggleBackgroundMusic() {
    const soundIcon = document.getElementById('soundIcon');
    if (world && world.background_music_player) {
        if (mute) {
            world.background_music_player.play();
            soundIcon.src = "./img/sound_icon.png"; 
            mute = false;
        } else {
            world.background_music_player.pause();
            mute = true;
            soundIcon.src = "./img/mute_icon.png"; 
        }
    }
}
