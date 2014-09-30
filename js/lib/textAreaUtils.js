(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {
    'use strict';
    /**
     * @namespace
     */
    var textAreaUtils = {
        /**
         * Extends selection to the match whole paragraphs
         * @param {HTMLTextAreaElement} textArea
         * @return HTMLTextAreaElement
         */
        extendSelectionParas: function (textArea) {
            var before = textArea.value.substring(0, textArea.selectionStart);
            var beforeCR = before.lastIndexOf('\n');
            var newStart = 0;
            if (beforeCR != -1) {
                newStart = beforeCR + 1
            }
            textArea.selectionStart = newStart;

            var afterCR = textArea.value.indexOf('\n', textArea.selectionEnd);
            var newEnd = textArea.value.length;
            if (afterCR != -1) {
                newEnd = afterCR
            }
            textArea.selectionEnd = newEnd;

            return textArea;
        },

        /**
         * Replaces selection with given string, and adjusts selection appropriately.
         * @param {HTMLTextAreaElement} textArea
         * @param {String} newSelectionVal
         * @return HTMLTextAreaElement
         */
        replaceSelection: function (textArea, newSelectionVal) {
            var oldStart = textArea.selectionStart;

            textArea.value = textArea.value.substring(0, textArea.selectionStart) +
                newSelectionVal +
                textArea.value.substring(textArea.selectionEnd);

            textArea.selectionStart = oldStart;
            textArea.selectionEnd = oldStart + newSelectionVal.length;

            return textArea;
        }
    };

    return textAreaUtils;
}));