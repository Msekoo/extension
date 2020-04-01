// 类型推断，从右向左
let a = 1
let b = [1, null]

let c = (x = 1) => x + 1
// 从左向右
window.onkeydown = (event: KeyboardEvent) => {
    console.log("window.onkeydown -> event", event)
}
// 类型断言: as  

// 类型兼容性 
// X兼容Y：X（目标类型）= Y（源类型）
// let s: string = 'a'
// s = null

// 接口兼容性
interface X {
    a: any
    b: any
}
interface Y {
    a: any
    b: any
    c: any
}
// 鸭式变形法
let x1: X = { a: 1, b: 2 }
let y1: Y = { a: 1, b: 2, c: 3 }
x1 = y1

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
    return handler
}
// 满足目标兼容源类型的三个要求
// 1）参数个数。源少于目标
let handler1 = (a: number) => { }
hof(handler1)

// 可选参数和剩余参数
let o1 = (p1: number, p2: number) => { }
let o2 = (p1?: number, o2?: number) => { }
let o3 = (...args: number[]) => { }
o1 = o2
o1 = o3
// 需关闭严格函数类型检验
// o2 = o1 
// o2 = o3
o3 = o1
o3 = o2

// 2）参数类型
let handler3 = (a: string) => { }
// hof(handler3)

interface Point3D{
    x: number
    y: number
    z: number
}
interface Point2D{
    x: number
    y: number
}
let p3d = (point: Point3D) => { }
let p2d = (point: Point2D) => { }
// 函数参数的双向协变
p3d = p2d
// p2d = p3d

// 3）返回值类型 目标返回类型是源类型的子类型或一致
let f1 = () => ({ name: 'ww' })
let f2 = () => ({ name: 'ww', loaction: 'ss' })
f1 = f2
// f2 = f1

// 重载 目标参数多于源参数，目标返回值类型是源类型的子类型
function overload(a: number, b: number): number;// 目标
function overload(a: string, b: string): string;
function overload(a: any, b: any): any { // 源

}

// 枚举类型兼容性
enum Fruit{ Apple, Banana }
enum Apple{ Red, Yellow }
let fruit: Fruit.Apple = 1 // 枚举类型和数值类型之间互相兼容
let apple: number = Apple.Red
// let fruit1: Fruit.Apple = Apple.Red //枚举类型之间不兼容

// 类兼容性 比较时，构造函数和静态成员不参与比较
// 类中含有私有成员时，类的实例不兼容，但父类和子类的实例可以相互兼容

class A {
    constructor(p: number, q: number) { }
    id: number = 1
    private name: string = ''
}
class B {
    static c = 1 
    constructor(p: number) { }
    id: number = 2
    private name: string = ''
}
let aa = new A(1, 2)
let bb = new B(2)
// aa = bb
// bb = aa
class M extends A{

}
let mm = new M(0, 9)
mm == aa
aa = mm

// 泛型兼容性
interface Empty<T>{
   value: T
}
let log11: Empty<string> = { value : '1'}
let log22: Empty<number> = { value : 1 }

// log11 = log22
// log22 = log11
// 泛型函数,定义相同，没有指定类型参数，则相互兼容
let log33 = <T>(x: T): T => {
    console.log('x')
    return x
}
let log44 = <U>(y: U): U => {
    console.log('y')
    return y
}
log33 = log44

// 总结：
// 结构之间兼容： 成员少的兼容成员多的
// 函数之间兼容： 参数多的兼容参数少的



