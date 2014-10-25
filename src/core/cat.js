function cat(foo) {
    return function () {
        try {
            return foo.apply(this, arguments);
        } catch (e) {
            _onthrow(e);
        }
    };
}

tryjs.cat = cat;