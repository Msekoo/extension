// 交叉类型，取并集
interface DogInterface{
    run(): void
}
interface CatInterface{
    jump(): void
}
let pet: DogInterface & CatInterface = {
    run() { },
    jump() { }
}
// 联合类型
let ii: number | string = 2
// 字面量联合类型
let oo: 'w' | 'f' | 'p'
let rr: 1 | 2 | 3

class Dogs implements DogInterface{
    run() { }
    eat(){ }
}
class Cats implements CatInterface{
    jump() { }
    eat() { }
}
enum Master { Boy, Girl }
function getPet(master: Master) {
    let pet = master === Master.Boy ? new Dogs() : new Cats()
    pet.eat()
    // pet.run()
    return pet
}
// 可区分的联合类型，是一种结合了联合类型和字面量类型的一种类型保护方法
interface Reactangle{
    kind: "reactangle"
    width: number
    height: number
}
interface Square{
    kind: "square"
    size: number
}
interface Circle{
    kind: "circle"
    r: number
}
type Shape = Square | Reactangle | Circle
function area(s: Shape) {
    switch (s.kind) {
        case 'reactangle':
            return s.width * s.height;
        case 'square':
            return s.size * s.size;
        case 'circle':
            return Math.PI * s.r
        default:
            return ((e: never) => {throw new Error(e)})(s)
    }
}

// 索引类型
let objs = {
    a: 1,
    b: 2,
    c: 3
}
function getValues<T, K extends keyof T>(objs: T,keys: K[]): T[K][] {
    return keys.map(key => objs[key])
}
console.log(getValues(objs, ['a', 'b']))
// console.log(getValues(objs, ['a', 's']))

// keyof T
interface Obj {
    a: number,
    b: string
}
let key: keyof Obj
// T[K]
let value: Obj['a']
// T extends U

// 映射类型
interface Objt {
    a: string;
    b: number;
    c: boolean;
}
// 同态 ， 只作用于objt, 不会引入新的属性
type ReadonlyObj = Readonly<Objt>
type PartialObj = Partial<Objt>
type PickObj = Pick<Objt, 'a' | 'c'>
// 非同态
type RecordObj = Record<'x' | 'y', Objt>

// 条件类型
// T extends U ? X : Y
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object"

type T1 = TypeName<string>
// (A|B) extends U ? X : Y
// A extends U ? X : Y | B extends U ? X : Y
type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T
type T4 = Diff<"a" | "b" | "c", "a" | "e">
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
// never | "b" | "c"
// "b" | "c"
// 可以过滤类型
type NotNull<T> = Diff<T, undefined | null>
type T5 = NotNull<string | number | undefined | null>
// 官方实现 Exclude<T,U>  NotNullable<T> 
// Extract<T, U>抽取出可以赋值给U的类型，与Exclude相反
// ReturnType<T> 获取函数返回值类型
