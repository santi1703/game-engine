import Color from "../utils/color.js";
import UiElement from "./uiElement.js";

class HealthBar extends UiElement {
    constructor(field, x, y, width, height, backgroundColor, drawEmpty = false) {
        super(field, x, y, width, height, backgroundColor);
        this.drawEmpty = drawEmpty;
        this.currentTick = 0;
        this.startingHP = this.field.startingHP;
        this.currentHP = this.startingHP;
    }

    draw() {
        super.draw();
        this.width = this.maxWidth * (this.currentHP / this.startingHP);

        this.interpolateColor('#FF0000FF');
        this.field.context.fillStyle = this.textColor;
        this.field.context.font = `${this.textSize}px bold Arial`;
        // let remainingLife = Math.round(this.width / this.maxWidth * 100);
        this.field.context.fillText(
            `${this.currentHP}/${this.startingHP} HP`,
            this.drawEmpty ? this.maxWidth / 2 : this.width / 2,
            this.y + this.textSize / 3 + this.maxHeight / 2
        );
        this.field.context.strokeStyle = this.strokeColor;
        if (this.drawEmpty) {
            this.field.context.strokeRect(this.x, this.y, this.maxWidth, this.height);
        } else {
            this.field.context.strokeRect(this.x, this.y, this.width, this.height);
        }

        this.tick();
    }

    interpolateColor(targetColor) {
        if (!this.hasOwnProperty('startingColor')) {
            this.startingColor = Color.fromRgbaString(this.backgroundColor);
        }

        this.backgroundColor = this.startingColor.interpolateRgba(targetColor, this.startingHP - this.currentHP, this.startingHP).getRgba();
    }

    tick() {
        this.currentHP = this.field.currentHP;
    }
}

export default HealthBar;