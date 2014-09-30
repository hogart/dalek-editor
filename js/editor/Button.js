require(
    [
        'underscore'
    ],

    function (_) {
        'use strict';

        function Button (config) {
            this.initialize(config);
        }

        _.extend(Button.prototype, {
            initialize: function (config) {
                this.config = config;

                this.title = this.config.title || this.config.text;
            },

            toString: function () {
                var btn = '<button class="btn" title="' + this.title + '"';

                if (this.config.attributes) {
                    _.each(this.config.attributes, function (value, key) {
                        btn += ' ' + key + '="' + value + '"';
                    })
                }
                btn += '>' + this.config.text + '</button>';
                return btn;
            },

            action: function (text) {
                if (this.config.action) {
                    return this.config.action(text)
                } else if (this.config.start) {
                    return this.config.start + text.trim() + this.config.end;
                } else {
                    return text;
                }
            }
        });

        return Button;
    }
);