define(function () {
    return {
        init: function () {
            $('#test').on('click', function () {
            	// asdf is undefined.
                console.log(asdf);
            })
        }
    }
});