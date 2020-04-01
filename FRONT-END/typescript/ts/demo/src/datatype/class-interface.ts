// 接口不能约束类的公有成员和构造函数
interface Human{
    name: string
    eat(): void
}
class Asi implements Human {
    constructor(name: string) {
        this.name = name;
    }
    name: string
    eat() { }
    sleep() { }
}
interface Man extends Human{
    run(): void
}
interface Child{
    cry(): void
}
// 接口继承多个接口,便于可重用和合并
interface Boy extends Man, Child{

}
let boy: Boy = {
    name: '',
    run() { },
    eat() { },
    cry() { },
}
// 接口继承类，抽象出类的成员结构而不实现，包括公有，私有，受保护成员
class Auto {
    state = 1
    private state2 ?= 3
}
interface AutoInterface extends Auto{

}
class C implements AutoInterface{
    state = 1
}
class Bus extends Auto implements AutoInterface{

}
// 总结： 接口能继承接口，继承类（抽离public、private、protected成员）,类能继承类，能实现接口（接口只能约束类的public成员）
// 继承带有私有成员类的接口，可以对子类起到约束作用，保证继承关系
// 抽象类可以包含方法的实现，可以只声明不实现，而接口只能声明方法，不能实现。 抽象类侧重于类别的抽象（定义这个对象是什么，比如： 人类可以是男人的抽象类）
// 而接口侧重于功能的抽象（定义这个对象能做什么，比如：人可以吃喝跳）