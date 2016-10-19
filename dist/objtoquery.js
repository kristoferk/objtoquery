// objtoquery
// ------------
// v1.0.0
//
// Copyright (c) 2012-2016 Kristofer Karlsson
// Distributed under MIT license
//
// http://github.com/kristoferk/objtoquery

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.objToQuery = factory();
    }
}(this, function () {
    function objToQuery(a, options){
        var isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };

        var type = function(obj) {
            return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        };

        var isFunction = function(obj) {
            return type(obj) === "function";
        };

        var buildParams = function(prefix, obj, traditional, add) {
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
                    if (obj.hasOwnProperty(name)) {
                        buildParams(prefix + "." + name, obj[name], traditional, add);
                    }
                }
            } else {
                add(prefix, obj);
            }
        };

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

            if (options.toLower && key.toLowerCase) {
                key = key.toLowerCase();
            }

            if (!options.skipEncoding) {
                stringValues[stringValues.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            } else {
                stringValues[stringValues.length] = key + "=" + value;
            }
        };

        for (var prefix in a) {
            if (a.hasOwnProperty(prefix)) {
                buildParams(prefix, a[prefix], false, add);
            }
        }

        var r20 = /%20/g;
        // Return the resulting serialization
        return stringValues.join("&").replace(r20, "+");
    };

    return objToQuery;
}));