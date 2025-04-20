import Color from "./utils/color.js";
import {randomUuid, randomWithinRange} from "./utils/number.js";

class Drawable {
    constructor(field, x, y, width, height, backgroundColor = '#FF000030', fadable = false, fadeTime = randomWithinRange(100, 500)) {
        this.id = randomUuid();
        this.field = field;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.fadable = fadable;
        this.fadeTime = fadeTime;
        this.startingTick = this.field.tick;
        this.slot = null;
    }

    draw() {
        this.field.context.fillStyle = this.backgroundColor;
        this.field.context.fillRect(this.x, this.y, this.width, this.height);
        this.tick();
    }

    interpolateColor(targetColor) {
        let tick = this.field.tick - this.startingTick;

        if (!this.hasOwnProperty('startingColor')) {
            this.startingColor = Color.fromRgbaString(this.backgroundColor);
        }

        this.backgroundColor = this.startingColor.interpolateRgba(targetColor, tick, 500).getRgba();
    }

    delete() {
        this.field.removeElement(this.id, this.slot);
    }

    tick() {
        this.currentTick = this.field.tick - this.startingTick;

        if (this.fadable) {
            if (!this.hasOwnProperty('startingColor')) {
                this.startingColor = Color.fromRgbaString(this.backgroundColor);
            }

            this.backgroundColor = this.startingColor.fadeOut(this.currentTick, this.fadeTime).getRgba();
        }

        if (this.fadable && this.currentTick >= this.fadeTime) {
            this.delete();
        }
    }
}

export default Drawable;