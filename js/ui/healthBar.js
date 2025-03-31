import Color from "../utils/color.js";
import UiElement from "./uiElement.js";
import {randomWithinRange} from "../utils/number.js";

class HealthBar extends UiElement {
    constructor(field, x, y, width, height, backgroundColor, drawEmpty = false) {
        super(field, x, y, width, height, backgroundColor);
        this.drawEmpty = drawEmpty;
        this.currentTick = 0;
        this.maxLife = 500;
        this.currentLife = this.maxLife;
    }

    draw() {
        super.draw();
        this.width = this.maxWidth * (this.currentLife / this.maxLife);

        this.interpolateColor('#FF0000FF');
        this.field.context.fillStyle = this.textColor;
        this.field.context.font = `${this.textSize}px bold Arial`;
        // let remainingLife = Math.round(this.width / this.maxWidth * 100);
        this.field.context.fillText(
            `${this.currentLife} HP`,
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

        this.backgroundColor = this.startingColor.interpolateRgba(targetColor, this.maxLife - this.currentLife, this.maxLife).getRgba();
    }

    tick() {
        // this.currentTick = this.field.tick - this.startingTick;
        this.currentLife = Math.random() > 0.8 ? Math.min(Math.max(0, this.currentLife + randomWithinRange(-5, 4)), this.maxLife) : this.currentLife;
    }
}

export default HealthBar;