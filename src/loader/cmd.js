var _async = root.require.async,
    _define = root.define;
if (_require && _define) {
	root.require.async = makeArgsTry(_async)
	merge(root.require.async, _async);
    root.define = makeArgsTry(_define);
    merge(root.define, _define);
}