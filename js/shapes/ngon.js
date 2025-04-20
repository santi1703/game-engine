import Color from "../utils/color.js";
import {randomWithinRange} from "../utils/number.js";
import Drawable from "../drawable.js";

class Ngon extends Drawable {
    constructor(field, x, y, width, height, backgroundColor, sides = randomWithinRange(1, 3) * 2 + 1, angle = 0) {
        super(field, x, y, width, height, backgroundColor, false);
        this.sides = sides;
        this.baseAngle = angle / 180 * Math.PI;
        this.backgroundColor = Color.randomRgbaColor().getRgba();
        this.rotationSpeed = randomWithinRange(-100, 100) / 2000;
        this.setProperties();
        this.points = [];
    }

    setProperties() {
        this.centerX = this.x - this.width / 2;
        this.centerY = this.y - this.width / 2;
        this.radius = this.width / 2;
    }

    draw() {
        this.field.context.beginPath();
        this.field.context.fillStyle = this.backgroundColor;
        this.points = [];
        for (let i = 0; i < this.sides + 1; i++) {
            let angle = (Math.PI / this.sides * 2) * i + this.baseAngle;
            let pointX = Math.cos(angle) * this.width + this.centerX;
            let pointY = Math.sin(angle) * this.width + this.centerY;
            if (i === 0) {
                this.field.context.moveTo(pointX, pointY);
            } else {
                this.points.push([pointX, pointY]);
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

    wasHit(point) {
        const vertexCount = this.sides;
        const x = point.x;
        const y = point.y;
        let inside = false;

        let p1 = {x: this.points[0][0], y: this.points[0][1]};
        let p2;

        for (let i = 1; i <= vertexCount; i++) {
            p2 = {x: this.points[i % vertexCount][0], y: this.points[i % vertexCount][1]};

            if (y > Math.min(p1.y, p2.y)) {
                if (y <= Math.max(p1.y, p2.y)) {
                    if (x <= Math.max(p1.x, p2.x)) {
                        const xIntersection = ((y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y) + p1.x;

                        if (p1.x === p2.x || x <= xIntersection) {
                            inside = !inside;
                        }
                    }
                }
            }

            p1 = p2;
        }

        return inside;
    }
}

export default Ngon;