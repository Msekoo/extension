## js任务执行机制

* 宏任务由微任务构成，宏任务有优先级，微任务没有
* 一个宏任务内的微任务执行完才会执行下一个宏任务，一个宏任务只有一个微任务队列，根据微任务的入队时间来决定执行顺序
* await、promise的resolve会产生微任务
* script同步代码，setTimeout，setInterval都是宏任务
