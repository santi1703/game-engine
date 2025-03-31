class Field {
    static ELEMENTS_STATIC = 'static';
    static ELEMENTS_DYNAMIC = 'dynamic';
    static ELEMENTS_UI = 'ui';

    constructor() {
        this.tick = 0;
        this.margin = 10;
        this.startingTime = Date.now();
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.height = this.canvas.clientHeight;
        this.width = this.canvas.clientWidth;
        this.backgroundColor = '#b1c1ffff';
        this.timeoutMilliseconds = 20;
        this.elements = {
            'static': {},
            'dynamic': {},
            'ui': {},
        };
        this.loop();
    }

    addElement(slot, element) {
        element.slot = slot;
        this.elements[slot][element.id] = element;
    }

    removeElement(id, slot) {
        delete this.elements[slot][id];
    }

    addStaticElement(element) {
        this.addElement(Field.ELEMENTS_STATIC, element);
    }

    addDynamicElement(element) {
        this.addElement(Field.ELEMENTS_DYNAMIC, element);
    }

    addUiElement(element) {
        this.addElement(Field.ELEMENTS_UI, element);
    }

    clean() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    draw() {
        for (let elementType of Object.values(this.elements)) {
            for (let element of Object.values(elementType)) {
                element.draw();
            }
        }
    }

    step() {
        this.tick++;
        this.clean();
        this.draw();
        this.currentTime = Date.now();
    }

    loop() {
        setTimeout(this.loop.bind(this), this.timeoutMilliseconds);
        this.step();
    }
}

export default Field;