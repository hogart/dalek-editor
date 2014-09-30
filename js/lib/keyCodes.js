/**
 * @licence MIT
 * @author doctor.hogart@gmail.com
 * Collection of key codes constants in AMD/CommonJS module.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.keyCodes = factory();
    }
}(this, function () {
    return {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        DEL: 46,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
}));