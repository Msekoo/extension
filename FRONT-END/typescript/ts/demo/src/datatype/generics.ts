// 泛型函数
function log<T>(value: T): T {
    console.log(value)
    return value
}
log<string[]>(['a', 'b'])
log(['a', 'b'])

// type Log = <T>(value: T) => T
// let myLog: Log = log
// 泛型接口
interface Log<T = string>{ // 加在函数名后，表示所有成员都需是泛型
    // <T>(value: T): T
    (value: T): T
}
let myLog: Log<number> = log
myLog(333)

// 泛型类
class Log1<T> {
    run(value: T) {
        console.log("Log<T> -> run -> value", value)
        return value
    }
}
let log1 = new Log1<number>()
log1.run(1)
let log2 = new Log1()
log2.run('ssss')

interface Length{
    length: number
}
// 泛型约束
function logs<T extends Length>(value: T): T{
    console.log(value, value.length)
    return value
}
logs([1])
logs('lplplp')

// 泛型的好处：函数和类可以轻松的支持多种类型，增强程序的拓展性
// 不必写多条函数重载，冗长的联合类型声明，增强代码的可读性
// 灵活控制类型之间的约束