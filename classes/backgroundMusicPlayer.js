/**
 * Represents a background music player in the game.
 */
class BackgroundMusicPlayer {
    /**
     * Constructs a new background music player.
     * @param {string} audioFile - The path to the audio file.
     */
    constructor(audioFile) {
        /**
         * The audio element used for playing background music.
         * @type {HTMLAudioElement}
         */
        this.audio = new Audio(audioFile);  
        this.audio.loop = true;
        this.addEndedEventListener();
    }

    /**
     * Plays the background music.
     */
    play() {
        this.audio.play();
    }

    /**
     * Pauses the background music.
     */
    pause() {
        this.audio.pause();
    }

    /**
     * Stops the background music and resets its playback position to the beginning.
     */
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    /**
     * Adds an event listener to the audio element to handle the 'ended' event,
     * which resets and replays the audio when it reaches the end.
     */
    addEndedEventListener() {
        this.audio.addEventListener('ended', () => {
            this.audio.currentTime = 0;
            this.audio.play();
        });
    }
}
