class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage = 100;

    /**
     * Constructor for StatusBarEndboss class.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 460;
        this.y = -5;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

}
