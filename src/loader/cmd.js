var _async = root.require.async,
    _define = root.define;
if (_require && _define) {
    root.require.async = catArgs(_async)
    _merge(root.require.async, _async);
    root.define = catArgs(_define);
    _merge(root.define, _define);
}