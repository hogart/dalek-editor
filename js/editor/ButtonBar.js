require(
    [
        './Button',
        'underscore',
        'jquery'
    ],

    function (Button, _, $) {
        'use strict';

        function ButtonBar (config, editor) {
            this.initialize(config, editor);
        }

        _.extend(ButtonBar.prototype, {
            initialize: function (config, editor) {
                this.$el = config.$el;
                this.editor = editor;

                _.each(
                    config,
                    function (configItem) {
                        var btn = new Button(configItem),
                            btnNode = $(btn.toString());

                        this.$el.append(btnNode);
                        btnNode.on('click', function () {
                            editor.action(btn.action.bind(btn));
                        })
                    },
                    this
                )
            }
        });

        return ButtonBar;
    }
);