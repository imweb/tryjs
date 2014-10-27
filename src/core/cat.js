function cat(foo, args) {
    return function () {
        try {
            return foo.apply(this, args || arguments);
        } catch (e) {
            _onthrow(e);
        }
    };
}