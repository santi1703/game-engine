import Field from "./field.js";
import HealthBar from "./ui/healthBar.js";
import Color from "./utils/color.js";
import Ngon from "./shapes/ngon.js";
import {randomWithinRange} from "./utils/number.js";
import UiTime from "./ui/uiTime.js";
import UiElement from "./ui/uiElement.js";
import UiText from "./ui/uiText.js";

let field = new Field();

// field.addStaticElement(new Drawable(field, field.width / 3, field.height - 260, field.width / 2, 30 + field.height / 3, Color.randomRgbaColor().getRgba(), true));
// field.addStaticElement(new Drawable(field, 250 - field.width / 3, field.height - 250, field.width / 2, field.height / 3, Color.randomRgbaColor().getRgba(), true));

for (let i = 0; i < 200; i++) {
    field.addDynamicElement(
        new Ngon(
            field,
            randomWithinRange(0, field.width),
            randomWithinRange(0, field.height),
            field.width / 8,
            field.height / 8,
            Color.randomRgbaColor().getRgba()
        )
    );
}

field.addUiElement(new HealthBar(field, 0, field.height - 35, field.width, 25, '#00FF00FF', true));
field.addUiElement(new UiElement(field, 0, 0, field.width, field.height / 15, '#FFFF0070'));
field.addUiElement(new UiTime(field, field.width - 100, 27, 35, '', '#FFFFFFFF', '#000000FF'));

addEventListener('click', function (event) {
    let dynamicElements = field.getDynamicElements();
    for (let element of Object.values(dynamicElements)) {
        let wasHit = element.wasHit({x: event.offsetX, y: event.offsetY});
        if (wasHit) {
            let damage = field.currentHP > 0 ? randomWithinRange(1, Math.min(field.currentHP, 9)) : 0;
            if (damage > 0) {
                field.damagePlayer(damage);
                element.delete();
            }
            field.addUiElement(new UiText(field, event.offsetX, event.offsetY, 20, damage, '#FFFF30FF', '#000000FF', true, 15));
            break;
        }
    }
});
