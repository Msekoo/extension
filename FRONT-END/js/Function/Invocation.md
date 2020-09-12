## 方法调用模式



* 函数作为对象的一个属性时，可陈它为一个方法。方法调用时，this绑定到当前该对象。通过该this可取到它所属对象的上下文。如果该方法为箭头函数定义，则this还是绑定到全局。



## 函数调用模式



* 当函数并非对象属性，而是做为一个函数调用时，this绑定到全局，除非在方法内保存this为一个变量，通过该变量获取上下文。



## 构造器调用模式



* 如果在一个函数前面带上new来调用，那么背地里将会创建有一个连接到该函数的prototype成员的新对象，同时this被绑定到这个新对象。



## Apply调用模式



* apply可构建一个数组和this环境传递给调用数组。



## 参数



* arguments包含调用时传递的所有参数，包括没有分配给形式参数的参数。



## 返回



* 未指定返回值时返回undefined，若调用时前加了new前缀，且返回值不是一个对象时，则返回this(该新对象)。



## 属性



* for...in.. 循环所有属性，包括原型链上的属性，hasOwnProperty可过滤属性，原型链上的属性会返回false.