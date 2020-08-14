#### Promise

1、`Promise.prototype.catch`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

2、Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

3、一般来说，不要在`then`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。

4、`reject`方法的作用，等同于抛出错误。

5、跟传统的`try/catch`代码块不同的是，如果没有使用`catch`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

6、`catch`方法返回的还是一个 Promise 对象，后面还可以接着调用`then`方法。`catch`方法抛出一个错误，可以用第二个`catch`方法来捕获前一个`catch`方法抛出的错误。