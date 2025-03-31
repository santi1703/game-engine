import Drawable from "../drawable.js";

class UiElement extends Drawable {
    constructor(field, x, y, width, height, backgroundColor) {
        super(field, x, y, width, height, backgroundColor);
        this.maxWidth = width;
        this.maxHeight = height;
        this.textColor = '#000000FF';
        this.textSize = 15;
        this.strokeColor = '#000000FF';
    }

    draw() {
        super.draw();
    }

    tick() {
        super.tick();
    }
}

export default UiElement;