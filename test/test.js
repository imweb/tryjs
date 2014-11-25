describe('tryjs', function () {

    var Callback = {
        cb: undefined,
        done: function (e) {
            if (this.cb) {
                this.cb(e);
                this.cb = undefined; 
            } else {
                throw new Error('Something must be wrong');
            }
        },
        then: function (cb) {
            this.cb = cb;
        }
    };

    function onclick(e) {
        alert(ttt);
    }

    console.error = function (e) {
        Callback.done(e);
    };

    var modern = true;
    try {
        badjsIngore();
    } catch(e) {
        if (!e.stack) modern = false;
    }

    // for modern bowser
    if (modern) {

        it('should catch require error', function (done) {
            Callback.then(function (e) {
                expect(e).to.match(/asf/);
                done();
            });
            define('./test1', 'test');
            require(['./test1'], function (test) {
                // undefined
                console.log(asf);
            });
        });

        it('should catch define error', function (done) {
            Callback.then(function (e) {
                expect(e).to.match(/fgh/);
                done();
            });
            define('./test2', function (test) {
                console.log(fgh);
            });
            require(['./test2']);
        });

        it('should catch setTimeout error', function (done) {
            Callback.then(function (e) {
                expect(e).to.match(/xx/);
                done();
            });
            setTimeout(function(){
                alert(xx);
            }, 0);
        });

        it('should catch setInterval error', function (done) {
            Callback.then(function (e) {
                expect(e).to.match(/oo/);
                done();
            });
            var timer = setInterval(function(){
                clearInterval(timer);
                alert(oo);
            }, 0);
        });

        it('should catch event error', function (done) {
            Callback.then(function (e) {
                expect(e).to.match(/ttt/);
                done();
            });
            $('<a href="javascript:void(0);" id="test"></a>').appendTo(document.body)
                .on('click', onclick).click();
        });

        it('should able to remove event listener', function (done) {
            $('#test').off('click', onclick).click();
            setTimeout(function () {
                done();
            }, 0)
        });

        it('if method of require or define attached attribute', function () {
            expect(define.amd.jQuery).to.equal(true);
            expect(require.testA).to.equal('testA');
            expect(define.testB).to.equal('testB');
        });
    }
});