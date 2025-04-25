import UiElement from "./uiElement.js";
import Color from "../utils/color.js";

class UiText extends UiElement {
    constructor(field, x, y, textSize = 20, text = 'UiText', textColor = '#FFFFFFFF', strokeColor = '#000000FF', fadable = true, fadeTime = 30) {
        super(field, x, y, 0, 0, textColor, fadable, fadeTime);
        this.text = text;
        this.textColor = textColor;
        this.strokeColor = strokeColor;
        this.stroke = true;
        this.textSize = textSize;
    }

    draw() {
        this.field.context.fillStyle = this.textColor;
        this.field.context.font = `bold ${this.textSize}px sans-serif`;

        let color = Color.fromRgbaString('#FF0000FF');

        this.field.context.beginPath();
        this.field.context.fillStyle = color.fadeOut(this.currentTick, this.fadeTime).getRgba();
        this.field.context.roundRect(this.x - 15, this.y - 15, 40, 30, 5);
        this.field.context.closePath();
        this.field.context.fill();

        this.field.context.fillStyle = this.backgroundColor;
        this.field.context.fillText(
            `${this.text}`,
            this.x,
            this.y + this.textSize / 3 + this.maxHeight / 2
        );
        if (this.stroke) {
            this.field.context.strokeStyle = this.strokeColor;
            this.field.context.lineWidth = 1;
            this.field.context.strokeText(
                `${this.text}`,
                this.x,
                this.y + this.textSize / 3 + this.maxHeight / 2
            );
        }
        this.tick();
        super.draw();
    }

    tick() {
        super.tick();
        this.y -= .3;
        this.x += .05 * this.currentTick;
    }
}

export default UiText;