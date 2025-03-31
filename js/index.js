import Field from "./field.js";
import HealthBar from "./ui/healthBar.js";
import Drawable from "./drawable.js";
import Color from "./utils/color.js";
import Ngon from "./shapes/ngon.js";
import {randomWithinRange} from "./utils/number.js";
import UiText from "./ui/uiText.js";
import UiElement from "./ui/uiElement.js";

let field = new Field();


field.addStaticElement(new Drawable(field, field.width / 3, field.height - 260, field.width / 2, 30 + field.height / 3, Color.randomRgbaColor().getRgba(), true));
field.addStaticElement(new Drawable(field, 250 - field.width / 3, field.height - 250, field.width / 2, field.height / 3, Color.randomRgbaColor().getRgba(), true));

for (let i = 0; i < 1500; i++) {
    field.addDynamicElement(
        new Ngon(
            field,
            randomWithinRange(0, field.width),
            randomWithinRange(0, field.height),
            field.width / 8,
            field.height / 8,
            Color.randomRgbaColor().getRgba(),
        )
    );
}

field.addUiElement(new UiElement(field, 0, 0, field.width, field.height / 15, '#FFFF0070'));
field.addUiElement(new UiText(field, field.width - 100, 27, 35, '', '#FFFFFFFF', '#000000FF'));
field.addUiElement(new HealthBar(field, 0, field.height - 35, field.width, 25, '#00FF00FF', true));
