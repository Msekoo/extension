## CommonJs和Es Module

commonJs和Es Module都是一种模块化的规范，解决的问题主要有三个: 

* 解决变量污染问题，每个文件都有独立的作用域
* 解决代码维护的问题，将不同功能的代码写在不同的文件，便于管理和维护
* 解决文件依赖的问题，一个文件里可以清楚的看到依赖了那些其它文件



## CommonJs

```js
// 导出
module.exports = {}
module.exporte.name = ***
exports.name = ***
exports = {} // 失效

// 导入
let data = require("./index.js")
let { .... } = require("./index.js")
```

* 可以导出任何类型的数据，module.exports和exports可混用，exports若导出引用类型的值，将会失效，因为exports是module.exports的引用，改变引用值就相当与module.exports脱离关系，从而导出无效，导出就根据module.exports导出的。
* 不管是`CommonJs`还是`Es Module`都不会重复导入，只要该文件内加载过一次，再次导入一次是不会生效的
* `CommonJs`支持动态导入，`CommonJs`导入的值是拷贝的，所以可以修改拷贝值，但这会引起变量污染，一不小心就重名



## Es Module

```js
// 导出
export const name = "蛙人"
export function fn() {}
export const test = () => {}
export { .... }
export default { 
  msg: '...'
}

// 导入             
import { .... } from './index.js'
import * as all from './index.js'
import msg, { .... } from './index.js'
```

* 支持export和export default混合导入，则该文件内用到混合导入，`import`语句必须先是默认导出，后面再是单个导出，顺序一定要正确否则报错。
* 就是`Es Module`语句`import`只能声明在该文件的最顶部，不能动态加载语句，`Es Module`语句运行在代码编译时。
* `export`导出的值是值的引用，并且内部有映射关系，这是`export`关键字的作用。而且导入的值，不能进行修改也就是只读状态。



## CommonJs和Es Module的区别

* 加载时机：CommonJS 是运行时加载（动态加载），ES Module 是编译时加载（静态加载）

* 加载模块：CommonJS 模块就是对象，加载的是该对象，ES Module 模块不是对象，加载的不是对象，是接口

* 加载结果：CommonJS 加载的是整个模块，即将所有的接口全部加载进来，ES Module 可以单独加载其中的某个接口（方法）

* 输出：CommonJS 输出值的拷贝，ES Module 输出值的引用

* 导入：CommonJS 导入值的可改，ES Module 导入值的不可改

* this: CommonJS 指向当前模块，ES Module 指向 undefined




### module.exports和exports,export和export default的区别

**module.exports**

module变量代表当前模块，这个变量是一个对象，module对象会创建一个叫exports的属性，这个属性默认值是一个空的对象

**exports**

exports变量是module.exports的引用，不可以直接导出一个引用类型的值

**export&export default**

export default在一个模块中只能有一个，也可无。export在一个模块中可以有多个。

export的对象、变量、函数、类需要有键名。