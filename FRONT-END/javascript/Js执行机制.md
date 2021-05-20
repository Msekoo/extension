## Js执行机制

js事件循环决定了代码的执行顺序，从全局上下文进入函数调用栈开始，直到调用栈清空，然后执行所有的`micro-task（微任务）`，当所有的`micro-task（微任务）`执行完毕之后，再执行`macro-task（宏任务）`，其中一个`macro-task（宏任务）`的任务队列执行完毕（例如`setTimeout` 队列），再次执行所有的`micro-task（微任务）`，一直循环直至执行完毕。



具体过程如下:

1、通过事件循环机制，调用栈不停的从任务队列中取出任务执行，任务队列又分为 `macro-task（宏任务）`（由宿主环境分发的异步任务）与 `micro-task（微任务）`（是由js引擎分发的任务 ），不同的任务会放进不同的任务队列之中。

2、首先执行`macro-task`，进入函数调用栈，等到函数调用栈清空之后再执行当前所有在微任务队列之中的`micro-task`。

3、等到所有`micro-task`执行完之后再从`macro-task`中的一个任务队列开始执行，就这样一直循环。

>  宏任务和微任务的队列执行顺序排列如下：

> `macro-task（宏任务）`：`script(整体代码)`, `setTimeout`, `setInterval`, `setImmediate（NodeJs）`, `I/O`, `UI rendering`。

> `micro-task（微任务）`: `process.nextTick（NodeJs）`, `Promise`, `Object.observe(已废弃)`, `MutationObserver(html5新特性)`

> 来自不同任务源的任务会进入到不同的任务队列。其中 `setTimeout` 与 `setInterval` 是同源的，如果执行setTimeout所在的延时队列时，发现还没到执行时间会先执行后续`macro-task（宏任务）`，然后等时间满足要求，再执行延时队列的任务。

