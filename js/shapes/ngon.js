import Color from "../utils/color.js";
import {randomWithinRange} from "../utils/number.js";
import Drawable from "../drawable.js";

class Ngon extends Drawable {
    constructor(field, x, y, width, height, backgroundColor, sides = randomWithinRange(2, 4) * 2 + 1, angle = 0) {
        super(field, x, y, width, height, backgroundColor, Math.random() > 0.5);
        this.sides = sides;
        this.baseAngle = angle / 180 * Math.PI;
        this.backgroundColor = Color.randomRgbaColor().getRgba();
        this.rotationSpeed = randomWithinRange(-100, 100) / 1000;
        this.setProperties();
    }

    setProperties() {
        this.centerX = this.x - this.width / 2;
        this.centerY = this.y - this.width / 2;
        this.radius = this.width / 2;
    }

    draw() {
        this.field.context.beginPath();
        this.field.context.fillStyle = this.backgroundColor;
        for (let i = 0; i < this.sides + 1; i++) {
            let angle = (Math.PI / this.sides * 2) * i + this.baseAngle;
            let pointX = Math.cos(angle) * this.width + this.centerX;
            let pointY = Math.sin(angle) * this.width + this.centerY;
            if (i === 0) {
                this.field.context.moveTo(pointX, pointY);
            } else {
                this.field.context.lineTo(pointX, pointY);
            }
        }
        this.field.context.closePath();
        this.field.context.fill();

        this.rotate();
        this.tick();
    }

    rotate() {
        this.baseAngle += this.rotationSpeed;
    }
}

export default Ngon;