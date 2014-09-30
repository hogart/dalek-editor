require(
    [
        './EditorBar',
        '../lib/textAreaUtils',
        '../lib/keyCodes',
        'underscore',
        '$'
    ],

    function (EditorBar, textAreaUtils, keyCodes, _, $) {
        'use strict';

        function Editor (el, config) {
            this.initialize(el, config);
        }

        _.extend(Editor.prototype, {
            defaults: {
                indent: '    ' // 4 spaces
            },

            settingsButton: [
                {
                    text: '<i class="icon-wrench"></i>',
                    title: 'Settings',
                    attributes: {
                        'data-toggle': 'modal',
                        'data-target': '.js-settings'
                    }
                }
            ],

            settings2JSON:  {
                monospace: function (value) { return value === 'on' }
            },

            initialize: function (el, config) {
                this.$el = $(el);
                this.config = config;

                this.config.push(this.settingsButton);

                this.options = _.extend({}, this.defaults);

                this.$ta = this.$el.find('.js-ta');
                this.$bar = this.$el.find('.js-bar');
                this.$settings = this.$el.find('.js-settings');

                this.$ta.on('keydown', this.onKeyDown.bind(this));

                this.$settings.on('change', this.onSettings.bind(this));

                this.editorBar = new EditorBar(this.$bar, this.config, this);
            },

            action: function (callback) {
                var ta = this.$ta[0],
                    selection = ta.value.substring(ta.selectionStart, ta.selectionEnd);

                this.replaceSelection(callback(selection));
                this.$ta.focus();
            },

            onKeyDown: function (evt) {
                if (evt.keyCode === keyCodes.TAB) {
                    evt.preventDefault();

                    this.extendSelectionParas();
                    var ta = this.$ta[0],
                        selection = ta.value.substring(ta.selectionStart, ta.selectionEnd),
                        result = [];

                    if (evt.shiftKey) {
                        _.each(selection.split('\n'), function (line) {
                            if (line.indexOf(this.options.indent) === 0) { // starts with this.options.indent
                                line = line.slice(this.options.indent.length)
                            }
                            result.push(line);
                        }, this);
                    } else {
                        _.each(selection.split('\n'), function (line) {
                            result.push(this.options.indent + line);
                        }, this);
                    }

                    this.replaceSelection(result.join('\n'));
                }
            },

            extendSelectionParas: function () {
                return textAreaUtils.extendSelectionParas(this.$ta[0]);
            },

            replaceSelection: function (newSelectionVal) {
                return textAreaUtils.replaceSelection(this.$ta[0], newSelectionVal);
            },

            onSettings: function (evt) {
                evt.preventDefault();
                var json = this.$settings.form2JSON(this.settings2JSON);

                if (json.monospace) {
                    this.$ta.css({'font-family': 'monospace'});
                } else {
                    this.$ta.css({'font-family': ''});
                }

            }
        });

        return Editor;
    }
);