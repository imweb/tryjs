tryjs
=====

> window.onerror在webkit中对于跨域的脚本错误无法捕获其stack，经常让我们无法定位上报的问题，tryjs利用try-catch将函数包裹起来，让错误捕获变得容易。

原理
----

对于基于AMD和jQuery的网站，几乎所有业务函数都是通过回调异步触发的，所以我们只需要将所有异步函数包裹起来就可以捕获到大部分错误。

例如，对于require函数，一般是这样使用的：

```javascript
require(['./main'],
	// 想办法把这个函数包裹起来 
	function (main) {
		// 实际上这里才是在调用
		main.init();
	});
```

类似的对于setTimeout函数，一般可以这样：

```javascript
setTimeout(
	// 想办法把这个函数包裹起来就行了
	function () {
		dosomthing();
	}, 
	1000
);
```

包裹了什么？
---------

* setTimeout
* setInterval
* jQuery event add
* require & define