<%
    it.throwTo = it.throwTo || 'default';
    switch (it.throwTo) {
        case 'default':
%>
        <%=include('./throw/default.js')(it)%>
<%
        break;
        case 'badjs':
%>
        <%=include('./throw/badjs.js')(it)%>
<%
        break;
    }
%>