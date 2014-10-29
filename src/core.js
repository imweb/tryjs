try {
    badjsIngore();
} catch (e) {
    if (!e.stack) {
        return;
    }
}

// merge
function _merge(org, obj) {
    var key;
    for (key in obj) {
        org[key] = obj[key];
    }
}

// function or not
function _isFunction (foo) {
    return typeof foo === 'function';
}

<%=include('./core/cat.js')(it)%>
<%=include('./core/catArgs.js')(it)%>
<%=include('./core/timeout.js')(it)%>