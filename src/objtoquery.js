ObjToQueryFunctions = {
    ToQuery: function (a, options) {
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        function type(obj) {
            return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        }
        function isFunction(obj) {
            return type(obj) === "function";
        }
        function buildParams(prefix, obj, traditional, add) {
            var name;

            if (isArray(obj)) {
                if (obj.length) {
                    for (var i = 0; i < obj.length; ++i) {
                        add(prefix, obj[i]);
                    }
                } else {
                    add(prefix, "");
                }
            } else if (type(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "." + name, obj[name], traditional, add);
                }
            } else {
                add(prefix, obj);
            }
        }

        options = options || {};
        var stringValues = [];
        var add = function (key, value) {
            // If value is a function, invoke it and return its value
            value = isFunction(value) ? value() : (value == null ? "" : value);

            if (options.removeEmptyValues) {
                if (value.length === 0) {
                    return;
                }
            }

            if (options.toLower) {
                key = key.toLowerCase();
            }

            if (!options.skipEncoding) {
                stringValues[stringValues.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            } else {
                stringValues[stringValues.length] = key + "=" + value;
            }
        };

        for (var prefix in a) {
            buildParams(prefix, a[prefix], false, add);
        }

        var r20 = /%20/g;
        // Return the resulting serialization
        return stringValues.join("&").replace(r20, "+");
    }
};