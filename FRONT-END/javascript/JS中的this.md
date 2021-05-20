## JS中的this

this 是执行上下文的一个属性，而不是某个变量对象的属性，是一个与执行上下文相关的特殊对象。

### 全局执行上下文中的this

指向宿主对象，浏览器为window，严格模式下（strict mode），this 会绑定到undefined。



### 函数执行上下文中的this



#### 1、通过call、bind、apply绑定的this

指向绑定的对象，如果是null或者undefined指向全局中的this。



####2、通过对象方法调用的this

1）使用对象来调用其内部的一个方法，该方法执行上下文中的 this 是指向对象本身的。

2）在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。 



####3、通过构造函数中设置，new创建

this指向新对象本身

> new 做了哪些事情：
>
> 1. 创建一个空的简单JavaScript对象（即`{}`）；
> 2. 链接该对象（设置该对象的**constructor**）到另一个对象（绑定原型链） ；
> 3. 将步骤1新创建的对象作为`this`的上下文 （执行构造函数，绑定步骤1建的对象到当前this上下文）；
> 4. 如果该函数没有返回对象，则返回`this`。

```js
var tempObj = {}
CreateObj.call(tempObj)
return tempObj
```

####4、箭头函数中的this

1、ES6的箭头函数不会创建自身的执行上下文，箭头函数中的this取决于它的外部函数。它的取值遵循普通普通变量一样的规则，沿着作用域链一层一层往上找。

```js
var obj = {
    len: 10,
    myFun: function  () {
        var innerFun = () => {
            console.log(this);
        };
        innerFun();
    }
};
obj.myFun(); 
```



2、箭头函数不能用call方法来修改this。

###eval执行上下文中的this

......

### this的设计缺陷以及应对方案

####1、 嵌套函数中的 this 不会从外层函数中继承，指向widow

```js
var myObj = {
    name: 'myName',
    showThis: function() {
        console.log(this) // myObj
        function inner () {
           console.log(this)
        }
        inner() // window
    }
}
myObj.showThis()
```



> 第一种是把 this 保存为一个 self 变量，再利用变量的作用域机制传递给嵌套函数。

> 第二种是继续使用 this，但是要把嵌套函数改为箭头函数，因为箭头函数没有自己的执行上下文，所以它会继承调用函数中的 this。



####2、 普通函数中的 this 默认指向全局对象 window

> 这个问题可以通过设置 JavaScript 的“严格模式”来解决。在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined，

