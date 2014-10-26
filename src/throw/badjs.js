var _onthrow = function (e) {
    root.Badjs(e, e.stack || window.location);
    // throw a error and badjs will ignore this error
    badjsIgnore();
};