(function($) {
    /**
     * converts form data to JSON
     * can also convert dehydrate data — pass dehydrationMap as hash of fieldName: conversionFn and enjoy
     * @param {Object} [dehydrationMap={}]
     */
    $.fn.form2JSON = function(dehydrationMap) {
        dehydrationMap = dehydrationMap || {};

        var serialized = this.serializeArray(),
            result = {},
            chunk;

        for (var i = 0, len = serialized.length; i < len; i++) {
            chunk = serialized[i];

            if (chunk.name in dehydrationMap) {
                chunk.value = dehydrationMap[chunk.name](chunk.value);
            }

            if (result[chunk.name]) {
                if (!$.isArray(result[chunk.name])) {
                    result[chunk.name] = [result[chunk.name]];
                }

                result[chunk.name].push(chunk.value);
            }
            else {
                result[chunk.name] = chunk.value;
            }
        }

        return result;
    };
})(jQuery);