function catArgs(foo) {
    return function () {
        var arg, args = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            arg = arguments[i];
            _isFunction(arg) && (arg = cat(arg));
            args.push(arg);
        }
        return foo.apply(this, args);
    }
}