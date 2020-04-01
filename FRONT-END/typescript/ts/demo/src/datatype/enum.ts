// 将程序中不容易记忆的硬编码或者未来可能改变的常量，以不变应万变

// 数字枚举
enum Role {
    Reproter = 2,
    Developer,
    Maintainer,
    Owner,
    Guest
}
console.log("Role", Role)


// 字符串枚举
enum Message {
    Success = 'jiji',
    Fail = 'pppp'
}

// 异构枚举 字符与数字混用
enum Answer{
    N,
    Y = 'Yes'
}

// 枚举成员
enum Char{
    // const
    a,
    b = Char.a,
    c = 1 + 3,
    // computed 在编译阶段不计算，保留到程序运行时计算
    d = Math.random(),
    e = '123'.length
}

// 常量枚举 只需要对象的值时使用，减少编译环境时的代码
const enum Mounth{
    Jan,
    Feb,
    Mar
}
let mounth = [Mounth.Jan, Mounth.Mar]

// 枚举类型
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'ss', b = 'ppp' }

let e: E = 3
let f: F = 3
// e === f  不同枚举类型不可比较

// 枚举成员类型
let e1: E.a = 1
let e2: E.b
// e1 ==== e2
let e3: E.a = 1
e1 === e3

let g1: G = G.b
let g2: G.a = G.a // 只能为自身
