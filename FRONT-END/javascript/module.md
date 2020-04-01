## module.exports和exports,export和export default的区别 ##

**module.exports**

module变量代表当前模块，这个变量是一个对象，module对象会创建一个叫exports的属性，这个属性默认值是一个空的对象

**exports**

exports变量是module.exports的引用，不可以直接导出一个匿名函数或是一个值

**export&export default**

es6语法，用于导出模块中的变量，对象，函数，类。对应的导入关键字为import。
区别：
* export default在一个模块中只能有一个，也可无。export在一个模块中可以有多个。
* export的对象、变量、函数、类需要有键名。