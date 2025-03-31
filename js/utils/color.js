import {decimalToHex, hexToDecimal, interpolate, randomWithinRange} from "./number.js";

class Color {
    constructor(red = '00', green = '00', blue = '00', alpha = '00') {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    static randomRgbaColor() {
        return new Color(
            decimalToHex(randomWithinRange(0, 255)),
            decimalToHex(randomWithinRange(0, 255)),
            decimalToHex(randomWithinRange(0, 255)),
            decimalToHex(randomWithinRange(30, 175))
        );
    }

    static fromRgbaString(rgbaString) {
        let primary = Color.getPrimaryColors(rgbaString);

        return new Color(primary.red, primary.green, primary.blue, primary.alpha);
    }

    static getPrimaryColors(rgbaString) {
        let red = rgbaString.substring(1, 3).toUpperCase();
        let green = rgbaString.substring(3, 5).toUpperCase();
        let blue = rgbaString.substring(5, 7).toUpperCase();
        let alpha = rgbaString.substring(7, 9).toUpperCase();

        return {
            red: red ? red : '00',
            green: green ? green : '00',
            blue: blue ? blue : '00',
            alpha: alpha ? alpha : 'FF',
        }
    }

    getRgba() {
        return `#${this.red}${this.green}${this.blue}${this.alpha}`;
    }

    interpolateRgba(targetRgbaString, step, totalSteps) {
        let amount = Math.min(step, totalSteps) / totalSteps;

        let targetPrimaryColors = Color.getPrimaryColors(targetRgbaString);

        let newRed = decimalToHex(interpolate(hexToDecimal(this.red), hexToDecimal(targetPrimaryColors.red), amount));
        let newGreen = decimalToHex(interpolate(hexToDecimal(this.green), hexToDecimal(targetPrimaryColors.green), amount));
        let newBlue = decimalToHex(interpolate(hexToDecimal(this.blue), hexToDecimal(targetPrimaryColors.blue), amount));
        let newAlpha = decimalToHex(interpolate(hexToDecimal(this.alpha), hexToDecimal(targetPrimaryColors.alpha), amount));

        return new Color(newRed, newGreen, newBlue, newAlpha);
    }

    fadeOut(step, totalSteps) {
        let targetColor = new Color(this.red, this.green, this.blue, '00');
        return this.interpolateRgba(targetColor.getRgba(), step, totalSteps);
    }
}

export default Color;