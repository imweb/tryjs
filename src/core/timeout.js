function catTimeout(foo) {
    return function (cb, timeout) {
        cb = cat(cb);
        try {
            foo(cb, timeout);
        } catch(e) {
            _onthrow(e);
        }
    }
}

root.setTimeout = catTimeout(root.setTimeout);
root.setIntveral = catTimeout(root.setInterval);