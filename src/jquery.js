<% if (it.jQuery) { %>
function makeArgsTry(foo, self) {
    return function () {
        var arg, args = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            arg = arguments[i];
            _isFunction(arg) && (arg = cat(arg));
            args.push(arg);
        }
        return foo.apply(self || this, args);
    }
}

var _add = root.jQuery.event.add,
    _ajax = root.jQuery.ajax;

if (_add) {
    root.jQuery.event.add = makeArgsTry(_add);
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