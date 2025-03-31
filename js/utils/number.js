function randomUuid() {
    return Date.now() + Math.round(Math.random() * 10000);
}

function randomWithinRange(min, max) {
    let val = min + Math.floor(Math.random() * (max - min + 1));
    return val;
}

function decimalToHex(number) {
    return number.toString(16).padStart(2, '0').toUpperCase();
}

function hexToDecimal(number) {
    return parseInt('0x' + number);
}

function interpolate(number1, number2, amount) {
    return Math.round(number1 + ((number2 - number1) * amount));
}


export {randomUuid, randomWithinRange, decimalToHex, hexToDecimal, interpolate};