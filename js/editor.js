function Button (config) {
    this.initialize(config);
};

Button.prototype = {
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
            return this.config.action(text);
        } else if (this.config.start) {
            return this.config.start + _.str.trim(text) + this.config.end;
        } else {
            return text;
        }
    }
};

function ButtonBar (config, editor) {
    this.initialize(config, editor);
}

ButtonBar.prototype = {
    initialize: function (config, editor) {
        this.$el = config.$el;
        this.editor = editor;

        _.each(
            config,
            function (configItem) {
                var btn = new Button(configItem),
                    btnNode = $(btn.toString());

                this.$el.append(btnNode);
                btnNode.bind('click', function () {
                    editor.action(_.bind(btn.action, btn));
                })
            },
            this
        );
    }
};

function EditorBar (el, config, editor) {
    this.initialize(el, config, editor);
}

EditorBar.prototype = {
    initialize: function (el, config, editor) {
        this.$el = $(el);
        this.config = config;
        this.editor = editor;

        _.each(
            this.config,
            function (barConfig) {
                barConfig.$el = $('<div class="btn-group"></div>');
                var bar = new ButtonBar(barConfig, this.editor);

                this.$el.append(bar.$el);
            },
            this
        );
    }
};

function Editor (el, config) {
    this.initialize(el, config);
}

Editor.prototype = {
    defaults: {
        indent: '    '
    },

    settingsButton: [
        {
            text: '<i class="icon-wrench"></i>',
            title: 'Settings',
            attributes: {
                'data-toggle': "modal",
                'data-target': ".js-settings"
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

        this.ta = this.$el.find('.js-ta');
        this.bar = this.$el.find('.js-bar');
        this.settings = this.$el.find('.js-settings');

        this.ta.bind('keydown', _.bind(this.onKeyDown, this));

        this.settings.bind('change', _.bind(this.onSettings, this));

        var eb = new EditorBar(this.bar, this.config, this);
    },

    action: function (callback) {
        var ta = this.ta[0],
            selection = ta.value.substring(ta.selectionStart, ta.selectionEnd);

        this.replaceSelection(callback(selection));
        this.ta.focus();
    },

    onKeyDown: function (evt) {
        if (evt.keyCode === 9) {
            evt.preventDefault();

            this.extendSelectionParas();
            var ta = this.ta[0],
                selection = ta.value.substring(ta.selectionStart, ta.selectionEnd),
                result = [];

            if (!evt.shiftKey) {
                _.each(selection.split('\n'), function (line) {
                    result.push(this.options.indent + line);
                }, this);
            } else {
                _.each(selection.split('\n'), function (line) {
                    if (_.str.startsWith(line, this.options.indent)) {
                        line = line.slice(this.options.indent.length);
                    }
                    result.push(line);
                }, this);
            }

            this.replaceSelection(result.join('\n'));
        }
    },

    extendSelectionParas: function () {
        var ta = this.ta[0];

        var before = ta.value.substring(0, ta.selectionStart);
        var beforeCR = before.lastIndexOf('\n');
        var newStart = 0;
        if (beforeCR != -1) {
            newStart = beforeCR + 1
        }
        ta.selectionStart = newStart;

        var afterCR = ta.value.indexOf('\n', ta.selectionEnd);
        var newEnd = ta.value.length;
        if (afterCR != -1) {
            newEnd = afterCR
        }
        ta.selectionEnd = newEnd;
    },

    replaceSelection: function (newSelectionVal) {
        var ta = this.ta[0],
            oldStart = ta.selectionStart;

        ta.value = ta.value.substring(0, ta.selectionStart) + newSelectionVal + ta.value.substring(ta.selectionEnd);
        ta.selectionStart = oldStart;
        ta.selectionEnd = oldStart + newSelectionVal.length;
    },

    onSettings: function (evt) {
        evt.preventDefault();
        var json = this.settings.form2JSON(this.settings2JSON);

        if (json.monospace) {
            this.ta.css({'font-family': 'monospace'});
        } else {
            this.ta.css({'font-family': ''});
        }
    }
};

$(function () {
    new Editor($('.js-editor'), config);
});