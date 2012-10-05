var config = [
    [
        {
            text: 'h2',
            start: '<h2>',
            end: '</h2>'
        },
        {
            text: 'h3',
            start: '<h3>',
            end: '</h3>'
        },
        {
            text: 'h4',
            start: '<h4>',
            end: '</h4>'
        },
        {
            text: 'p',
            action: function (text) {
                var itemsRaw = text.split(/\n/img),
                    items = _.map(itemsRaw, _.str.trim);
                return '<p>' + items.join('</p>\n<p>') + '</p>';
            }
        },
        {
            text: '«',
            title: 'blockquote',
            start: '<blockquote>',
            end: '</blockquote>'
        }
    ],

    [
        {
            text: '<i class="icon-list"></i>',
            title: 'ul > li',
            action: function (text) {
                var itemsRaw = text.split(/\n/img),
                    items = _.map(
                        itemsRaw,
                        function (item) {
                            return '\t<li>' + _.str.trim(item) + '</li>\n'
                        }
                    );
                return '<ul>\n' + items.join('') + '</ul>';
            }
        },
        {
            text: '<i class="icon-globe"></i>',
            title: 'a',
            action: function (text) {
                var second = '';
                if (_.str.startsWith(text, 'http')) {
                    second = prompt('Enter text:');
                    return '<a href="' + text + '">' + second + '</a>';
                } else {
                    second = prompt('Enter URL:');
                    return '<a href="' + second + '">' + text + '</a>';
                }
            }
        }
    ],

    [
        {
            text: '<i class="icon-bold"></i>',
            title: 'strong',
            start: '<strong>',
            end: '</strong>'
        },
        {
            text: '<i class="icon-italic"></i>',
            title: 'em',
            start: '<em>',
            end: '</em>'
        },
        {
            text: 'code',
            action: function (text) {
                text = text.replace(/\</mg, '&lt;').replace(/\>/mg, '&gt;');
                return '<code>' + text + '</code>';
            }
        },
        {
            text: '<i class="icon-tag"></i>',
            title: 'Wrap in any tag',
            action: function (text) {
                var tag = _.str.trim(prompt('Enter tag name (no attributes allowed):'));
                return ['<', tag, '>', text, '</', tag, '>'].join('');
            }

        },
        {
            text: 'small',
            start: '<small>',
            end: '</small>'
        }
    ],
    [
        {
            text: '&lt;pre class="prettyprint"/&gt;',
            action: function (text) {
                var mode = prompt('Enter mode:', 'HTML');
                if (mode === 'HTML' || mode === 'XML') {
                    text = text.replace(/\</mg, '&lt;').replace(/\>/mg, '&gt;');
                }

                return '<pre class="prettyprint" rel="' + mode + '">' + text + '</pre>'
            }
        },
        {
            text: '&lt;!--more--&gt;',
            title: 'Insert WP „more“',
            action: function (text) {
                return '<!--more-->' + text;
            }
        }
    ]
];