!function (root) {
    var _require = root.require,
        _define = root.define,
        _setTimeout = root.setTimeout,
        _setInterval = root.setInterval,
        _add = root.jQuery && root.jQuery.event.add,
        _onthrow = root.onthrow || function (e) {
            if (console) {
                console.error(e.stack);
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

    // try catch
    if (_require && _define) {
        root.require = makeArgsTry(_require);
        root.define = makeArgsTry(_define);
    }

    if (_add) {
        root.jQuery.event.add = makeArgsTry(_add);
    }

    root.setTimeout = makeArgsTry(_setTimeout);
    root.setInterval = makeArgsTry(_setInterval);

}(window);