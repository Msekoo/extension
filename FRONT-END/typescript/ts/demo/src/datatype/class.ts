class Dog {
    constructor(name: string) {
        this.name = name
    } // 添加protected表示只能被继承而不能实例化
    public name: string // 默认public
    run() { }
    private pri() { } // 私有成员不能被实例和子类调用，只能内部使用
    protected pro() { } // 只能在自身和子类中使用，不能被实例使用
    readonly legs: number = 4 // 只读属性需要被实例化
    static food: string = 'nnn' // 静态成员只能通过类名访问，可被继承
}
console.log(Dog.prototype)
let dog = new Dog('pop')
console.log("dog", dog)
// dog.pro()
class Husky extends Dog{
    constructor(name: string, public color?: string) { // 给构参添加成员修饰符，就变成实例属性，代码更简洁
        super(name)
        // this.color = color
    }
    // color?: string
    stu() {
        this.pro()
    }
}
let dog2 = new Husky('ppp', 'blue')
// dog2.pro()

// 抽象类， 只能被继承不能创建实例,可以抽离出一些食物的共性，利于代码复用和拓展，
// 还可以实现多态：多个子类中对改方法有不同实现，程序运行时，根据不同对象执行不同操作，实现了运行时绑定
abstract class Animal{
    eat() {
        console.log('eat')
    }
    abstract sleep(): void
}
class Cat extends Animal{
    constructor(name: string) {
        super()
        this.name = name
    }
    name: string
    run() { }
    sleep() {
        console.log('cat sleep')
    }
}
let cat = new Cat('ooo')
cat.eat()

class Rabbit extends Animal{
    sleep() {
        console.log('rabbit sleep')
    }
}
let rabbit = new Rabbit()

let animals: Animal[] = [cat, rabbit]
animals.forEach(i => {
    i.sleep()
})

class WorkFlow {
    step1(){
        return this;
    }
    step2() {
        return this;
    }
}
new WorkFlow().step1().step2()

class MyWorkFlow extends WorkFlow{
    next(){return this}
}
new MyWorkFlow().next().step1().next().step2()
