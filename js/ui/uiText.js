import UiElement from "./uiElement.js";

class UiText extends UiElement {
    constructor(field, x, y, textSize = 20, text = 'UiText', textColor = '#FFFFFFFF', strokeColor = '#000000FF') {
        super(field, x, y, 0, 0, '#FFFFFFFF');
        this.text = text;
        this.textColor = textColor;
        this.strokeColor = strokeColor;
        this.stroke = true;
        this.textSize = textSize;
    }

    draw() {
        this.field.context.fillStyle = this.textColor;
        this.field.context.font = `bold ${this.textSize}px sans-serif`;

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
    }

    tick() {
        super.tick();
        let seconds = Math.floor((this.field.currentTime - this.field.startingTime) / 1000) % 60;
        let minutes = Math.floor((this.field.currentTime - this.field.startingTime) / 1000 / 60) % 60;
        this.text = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }
}

export default UiText;