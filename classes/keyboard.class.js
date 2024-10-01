/**
 * Represents a keyboard controller for game inputs.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Creates an instance of Keyboard.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }

    /**
     * Binds key press events to control key states.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', this.handleKeyDownEvent);
        window.addEventListener('keyup', this.handleKeyUpEvent);
    }

    /**
      * Handles key down events for keyboard inputs.
      * @param {KeyboardEvent} event - The keyboard event.
      */
    handleKeyDownEvent = (event) => {
        const key = event.keyCode;
        if (key === 39) {
            this.RIGHT = true;
        } else if (key === 37) {
            this.LEFT = true;
        } else if (key === 38) {
            this.UP = true;
        } else if (key === 40) {
            this.DOWN = true;
        } else if (key === 32) {
            this.SPACE = true;
        } else if (key === 68) {
            this.D = true;
        }
    }

    /**
     * Handles key up events for keyboard inputs.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    handleKeyUpEvent = (event) => {
        const key = event.keyCode;
        if (key === 39) {
            this.RIGHT = false;
        } else if (key === 37) {
            this.LEFT = false;
        } else if (key === 38) {
            this.UP = false;
        } else if (key === 40) {
            this.DOWN = false;
        } else if (key === 32) {
            this.SPACE = false;
        } else if (key === 68) {
            this.D = false;
        }
    }

    /**
     * Binds key press events to control key states.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', this.handleKeyDownEvent);
        window.addEventListener('keyup', this.handleKeyUpEvent);
    }

    /**
     * Binds touch events to control key states for mobile devices.
     */
    bindBtsPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', this.handleTouchStartLeft);
        document.getElementById('btnLeft').addEventListener('touchend', this.handleTouchEndLeft);

        document.getElementById('btnRight').addEventListener('touchstart', this.handleTouchStartRight);
        document.getElementById('btnRight').addEventListener('touchend', this.handleTouchEndRight);

        document.getElementById('btnUp').addEventListener('touchstart', this.handleTouchStartUp);
        document.getElementById('btnUp').addEventListener('touchend', this.handleTouchEndUp);

        document.getElementById('btnThrow').addEventListener('touchstart', this.handleTouchStartThrow);
        document.getElementById('btnThrow').addEventListener('touchend', this.handleTouchEndThrow);
    }

    /**
     * Handles touch start event for left button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchStartLeft = (e) => {
        e.preventDefault();
        this.LEFT = true;
    }

    /**
     * Handles touch end event for left button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchEndLeft = (e) => {
        e.preventDefault();
        this.LEFT = false;
    }

    /**
     * Handles touch start event for right button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchStartRight = (e) => {
        e.preventDefault();
        this.RIGHT = true;
    }

    /**
     * Handles touch end event for right button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchEndRight = (e) => {
        e.preventDefault();
        this.RIGHT = false;
    }

    /**
     * Handles touch start event for up button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchStartUp = (e) => {
        e.preventDefault();
        this.SPACE = true;
    }

    /**
     * Handles touch end event for up button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchEndUp = (e) => {
        e.preventDefault();
        this.SPACE = false;
    }

    /**
     * Handles touch start event for throw button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchStartThrow = (e) => {
        e.preventDefault();
        this.D = true;
    }

    /**
     * Handles touch end event for throw button.
     * @param {TouchEvent} e - The touch event.
     */
    handleTouchEndThrow = (e) => {
        e.preventDefault();
        this.D = false;
    }
}

