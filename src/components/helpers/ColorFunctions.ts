// Converts a color to either white or black depnding on which color is closer
// @param {number[]} rgb - The R, G, and B values
// @returns {number[]} The RGB values clamped to either white or black
export function ClampRGB(rgb: number[]): number[] {
    if(rgb.length > 3) rgb = [rgb[0], rgb[1], rgb[2]];
    const sum =  rgb.reduce((acc, i) => {
        acc += (255 - i) > (255 / 2) ? 0 : 255;
        return acc;
    }, 0);
    return sum < (255 * 3) / 2 ? [0,0,0] : [255,255,255];
}

// Checks that a string input is a valid RGB value
// @param {string} value - The value entered by the user
// @returns {number[]} - An array representing the R, G, and B color values
export function CheckRGBValue(value: string): number[] {
    const seperator: string = value.indexOf(',') !== -1 ? ',' : ' ';
    const raw = value.replace(/[rgb]|a|[\(\)]/gi, '')
        .split(seperator)
        .map(i => i.trim())
        .map(i => Number(i))
        .filter(i => !isNaN(i));
    if(raw.length < 3) {
        return [];
    } else if(raw.length === 3) {
        raw[3] = 1;
    }
    return raw;
}

// Converts an HEX value to RGB
// @param {string} value - The HEX value
// @returns {number[]} - An array representing the R, G, and B color values
export function ConvertHEXtoRGB(value: string): number[] {
    let raw: number[];
    if(value.indexOf('#') === 0) value = value.substring(1);
    if(value.length === 3) {
        raw = value.split('').map(i => i + i).map(i => parseInt(i, 16));
    } else if(value.length === 6) {
        raw = value.match(/.{1,2}/g).map(i => parseInt(i, 16));
    } else {
        return [];
    }
    raw[3] = 1;
    return raw;
}

// Inverts a color
// @param {number[]} color - An array representing the R, G, and B color values
// @returns {number[]} - The same array but with the color values inverted
export function InvertColor(color: number[]): number[] {
    if(color.length > 3) {
        if(color[3] < .5) return [0,0,0];
        color = [color[0], color[1], color[2]];
    }
    let rgb: number[] = color.map(i => 255 - Number(i));
    if(!rgb.length) rgb = [255,255,255];
    return rgb;
}