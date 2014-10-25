! function(root) {
    var tryjs = root.tryjs = {};

    var _onthrow = function(e) {
        console.error(e);
    }

    // merge
    function _merge(org, obj) {
        var key;
        for (key in obj) {
            org[key] = obj[key];
        }
    }

    // function or not
    function _isFunction(foo) {
        return typeof foo === 'function';
    }

    function cat(foo) {
        return function() {
            try {
                return foo.apply(this, arguments);
            } catch (e) {
                _onthrow(e);
            }
        };
    }

    tryjs.cat = cat;

    function catArgs(foo) {
        return function() {
            var arg, args = [];
            for (var i = 0, l = arguments.length; i < l; i++) {
                arg = arguments[i];
                _isFunction(arg) && (arg = makeTry(arg));
                args.push(arg);
            }
            return foo.apply(this, args);
        }
    }

    tryjs.catArgs = catArgs;

    function catTimeout(foo) {
        return function(cb, timeout) {
            cb = cat(cb);
            try {
                foo(cb, timeout);
            } catch (e) {
                _onthrow(e);
            }
        }
    }

    root.setTimeout = catTimeout(root.setTimeout);
    root.setIntveral = catTimeout(root.setInterval);

    var _require = root.require,
        _define = root.define;
    if (_require && _define) {
        root.require = makeArgsTry(_require);
        merge(root.require, _require);
        root.define = makeArgsTry(_define);
        merge(root.define, _define);
    }



    function makeArgsTry(foo, self) {
        return function() {
            var arg, args = [];
            for (var i = 0, l = arguments.length; i < l; i++) {
                arg = arguments[i];
                _isFunction(arg) && (arg = makeTry(arg));
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
        root.jQuery.ajax = function(url, setting) {
            if (!setting) {
                setting = url;
                url = undefined;
            }
            makeObjTry(setting);
            if (url) return _ajax.call(root.jQuery, url, setting);
            return _ajax.call(root.jQuery, setting);
        }
    }

}(window);
