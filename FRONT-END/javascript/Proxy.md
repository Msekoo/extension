## Proxy

### handler.apply

apply可以让我们拦截一个函数(JS中函数也是对象,Proxy也可以拦截函数)的执行,我们可以把它用在函数节流中。

```js
const proxy = (func, time) => {
  let previous = new Date(0).getTime()
  let handler = {
    apply(target, context, args){
      let now = new Date().getTime()
      if(now - previous > time) {
        previous = now
        Reflect.apply(func, context, args)
      }
    }
  }
  return new Proxy(func, handler)
}
```



### handler.contruct

contruct可以拦截通过new关键字调用这个函数的操作,我们可以把它用在单例模式中。

```js
function proxy(func) {
  let instance;
  let handler = {
    construct(target, args){
      if(!instance) {
        instance = Reflect.construct(func, args)
      }
      return instance
    }
  }
  return new Proxy(func, handler)
}

function Person(name){
  this.name = name
}

const SingletonPerson = proxy(Person)

let person1 = new SingletonPerson('oo')
let person2 = new SingletonPerson('vv')
 // person1 === person2
```

这里通过一个闭包保存了instance变量,每次使用new关键字调用被拦截的函数后都会查看这个instance变量,如果存在就返回闭包中保存的instance变量,否则就新建一个实例,这样可以实现全局只有一个实例。



### handler.defineProperty

defineProperty可以拦截对这个对象的Object.defineProerty操作

**注意对象内部的默认的[[SET]]操作(即对这个对象的属性赋值)会间接触发defineProperty和getOwnPropertyDescriptor这2个拦截方法**

```js
function onChange(obj, callback){
  const handler = {
    get(target, key){
      try {
        return new Proxy(target[key], handler)
      } catch (e){
        Reflect.get(target, key)
      }
    }, 
    defineProperty(target, key, descriptor) {
      callback()
      return Reflect.difineProperty(target, key, descriptor)
    }
  }
  return new Proxy(obj, handler)
}
let obj = onChange({}, () => {
  console.log('opps')
})

obj.a = {} // oops
obj.a.b = 1 // oops
```

这里有几个知识点

1. 这里使用了递归的操作,当需要访问对象的属性时候,会判断代理的对象属性的值仍是一个可以代理的对象就递归的进行代理,否则通过错误捕获执行默认的get操作
2. 定义了defineProperty的拦截方法,当对这个代理对象的某个属性进行赋值的时候会执行对象内部默认的[[SET]]操作进行赋值,这个操作会间接触发defineProperty这个方法,随后会执行定义的callback函数

这样就实现了无论对象嵌套多少层,只要有属性进行赋值就会触发get方法,对这层对象进行代理,随后触发defineProperty执行callback回调函数。