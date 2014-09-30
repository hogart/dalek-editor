require(
    [
        './ButtonBar',
        'underscore',
        '$'
    ],

    function (ButtonBar, _, $) {
        'use strict';

        function EditorBar (el, config, editor) {
            this.initialize(el, config, editor);
        }

        _.extend(EditorBar.prototype, {
            initialize: function (el, config, editor) {
                this.$el = $(el);
                this.config = config;
                this.editor = editor;

                _.each(
                    this.config,
                    function (barConfig) {
                        barConfig.$el = $('<div class="btn-group"></div>');
                        var bar = new ButtonBar(barConfig, this.editor);

                        this.$el.append(bar.$el)
                    },
                    this
                );
            }
        });

        return EditorBar;
    }
);