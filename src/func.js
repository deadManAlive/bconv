/**
 * @typedef {Object} BinaryRepr
 * @property {string} binary
 * @property {string} sign
 * @property {string} exponent
 * @property {string} mantissa
 */

/**
 * @typedef {Object} ExpRepr
 * @property {number} mantissa
 * @property {number} exponent
 */

/**
    * @description Convert fractional binary value to decimal
    * @param {string} val
    * @returns {number}
    */
export function norm_b2d(val) {
    const valarr = val.split(".");

    const dec = parseInt(valarr[0], 2);
    if (dec > 1) {
        throw new Error("This function only works for normalized value!");
    }

    const dval = valarr.join("");
    let res = 0;

    for (let i = 0; i < dval.length; i++) {
        res += (+dval[i]) * Math.pow(2, -i);
    }

    return res;
}

/**
    * @description Parse decimal numbers to structure of float32
    * @param {number} val
    * @returns {BinaryRepr}
    */
export function f2b(val) {
    const f32repr = new Float32Array([val]);
    const u32repr = new Uint32Array(f32repr.buffer);

    let qtn = u32repr[0];
    let res = "";
    while (true) {
        let rem = qtn % 2;
        res += rem;

        qtn = Math.floor(qtn / 2);

        if (qtn < 1) {
            break;
        }
    }

    while (res.length < 32) {
        res += "0";
    }

    res = res.split("").reverse().join("");

    return {
        binary: res,
        sign: res[0],
        exponent: res.slice(1, 9),
        mantissa: res.slice(9)
    };
}

/**
 * @description Convert 32bit binary data representation to a decimal float value
 * @param {string} val
 * @returns {number} 
 */
export function b2f(val) {
    if(val.length !== 32) {
        return NaN;
    }
    if(/[^01]/g.test(val)) {
        return NaN;
    }

    const sign = val[0] == 0 ? 1 : -1;
    const expb = val.slice(1,9);
    const mtsb = val.slice(9);

    const expv = expb == '00000000' ? -126 : parseInt(expb, 2) - 127;
    const impb = expb == '00000000' ? '0' : '1';
    const mtsv = norm_b2d(impb + '.' + mtsb);

    return sign * Math.pow(2, expv) * mtsv;
}

/**
 * 
 * @param {string} val 
 * @returns {ExpRepr}
 */
export function exp2dcp(val) {
    if (isNaN(parseFloat(val))) {
        return {
            mantissa: NaN,
            exponent: NaN,
        }
    }

    const [mts, exp] = [...val.split(/e|E/)];

    return {
        mantissa: +mts,
        exponent: +exp ?? 0,
    }
}