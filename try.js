!function (root) {
    var _require = root.require,
        _define = root.define,
        _setTimeout = root.setTimeout,
        _setInterval = root.setInterval,
        _add = root.jQuery && root.jQuery.event.add,
        _ajax = root.jQuery && root.jQuery.ajax,
        _onthrow = root.onthrow || function (e) {
            if (console) {
                console.error(
                    e.stack.split('\n').slice(0, 4).join('\n')
                );
            } else {
                throw e;
            }
        };

    function _isFunction (foo) {
        return typeof foo === 'function';
    }

    function makeTry(foo, self) {
        return function () {
            try {
                return foo.apply(self || null, arguments);
            } catch (e) {
                _onthrow(e);
            }
        };
    }

    function makeArgsTry(foo, self) {
        return function () {
            var arg, args = [];
            for (var i = 0, l = arguments.length; i < l; i++) {
                arg = arguments[i];
                _isFunction(arg) && (arg = makeTry(arg));
                args.push(arg);
            }
            return foo.apply(self || null, args);
        }
    }

    function makeObjTry(obj) {
        var key, value;
        for (key in obj) {
            value = obj[key];
            if (_isFunction(value)) obj[key] = makeTry(value);
        }
        return obj;
    }

    function merge(org, obj) {
        var key;
        for (key in obj) {
            org[key] = obj[key];
        }
    }

    // try catch
    if (_require && _define) {
        root.require = makeArgsTry(_require);
        merge(root.require, _require);
        root.define = makeArgsTry(_define);
        merge(root.define, _define);
    }

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

    root.setTimeout = makeArgsTry(_setTimeout);
    root.setInterval = makeArgsTry(_setInterval);

}(window);