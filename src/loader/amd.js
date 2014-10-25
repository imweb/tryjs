var _require = root.require,
    _define = root.define;
if (_require && _define) {
    root.require = makeArgsTry(_require);
    merge(root.require, _require);
    root.define = makeArgsTry(_define);
    merge(root.define, _define);
}