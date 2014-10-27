function catTimeout(foo) {
    return function (cb, timeout) {
        // for setTimeout(string, delay)
        if (typeof cb === 'string') {
            try {
                cb = new Function(cb);
            } catch(e) {
                _onthrow(e);
            }
        }
        var args = [].slice.call(arguments, 2);
        // for setTimeout(function, delay, param1, ...)
        cb = cat(cb, args.length && args);
        return foo(cb, timeout);
    }
}

root.setTimeout = catTimeout(root.setTimeout);
root.setInterval = catTimeout(root.setInterval);