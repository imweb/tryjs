<% if (it.jQuery) { %>

/**
 * makeArgsTry
 * wrap a function's arguments with try & catch
 * @param {Function} foo
 * @param {Object} self
 * @returns {Function}
 */
function makeArgsTry(foo, self) {
    return function () {
        var arg, tmp, args = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            arg = arguments[i];
            _isFunction(arg) && (tmp = cat(arg)) && 
                (arg.tryWrap = tmp) && (arg = tmp);
            args.push(arg);
        }
        return foo.apply(self || this, args);
    }
}

/**
 * makeObjTry
 * wrap a object's all value with try & catch
 * @param {Function} foo
 * @param {Object} self
 * @returns {Function}
 */
function makeObjTry(obj) {
    var key, value;
    for (key in obj) {
        value = obj[key];
        if (_isFunction(value)) obj[key] = cat(value);
    }
    return obj;
}

var _add = root.jQuery.event.add,
    _ajax = root.jQuery.ajax,
    _remove = root.jQuery.event.remove;

if (_add) {
    root.jQuery.event.add = makeArgsTry(_add);
    root.jQuery.event.remove = function () {
        var arg, args = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            arg = arguments[i];
            _isFunction(arg) && (arg = arg.tryWrap);
            args.push(arg); 
        }
        return _remove.apply(this, args);
    }
}

if (_ajax) {
    root.jQuery.ajax = function (url, setting) {
        if (!setting) {
            setting = url;
            url = undefined;
        }
        makeObjTry(setting);
        if (url) return _ajax.call(root.jQuery, url, setting);
        return _ajax.call(root.jQuery, setting);
    }
}
<% } %>