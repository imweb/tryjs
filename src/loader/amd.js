var _require = root.require,
    _define = root.define;
if (_require && _define) {
    root.require = catArgs(_require);
    _merge(root.require, _require);
    root.define = catArgs(_define);
    _merge(root.define, _define);
}