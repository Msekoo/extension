// 声明合并
interface PO{
    x: number;
    // y: string // 非函数成员保证唯一性，不唯一的化，类型需相同
    foo(bar: number): number;  // 5 // 函数成员会被声明为一个函数重载,顺序：接口内部按书写顺序，接口之间后书写的先，如果函数的参数为一个字面量类型，会被提到第一位
    foo(bar: 'a'): number// 2
}
interface PO{
    y: number;
    foo(bar: string): string; // 3
    foo(bar: number[]): number[]; // 4
    foo(bar: 'a'): number // 1
}

let po: PO = {
    x:1,
    y: 2,
    foo(bar: any) {
        return bar
    }
}
// 命名空间的合并，不能重复实现

// 命名空间和函数声明合并
function Libs() { }
namespace Lib {
    export let version = '1.0'
}
console.log(Lib.version)

// 命名空间和类声明合并
class CC{ }
namespace CC {
    export let state = 1 // 相当于给类增加了静态属性
}
console.log(CC.state)
// 命名空间和函数和类合并需要放在其后面

// 命名空间和枚举进行合并，顺序可变, 枚举会先声明变量
namespace Color {
    export function mix(){} // 相当于给枚举增加了一个函数
}
enum Color{
    Red,
    Yellow,
    Blue
}

// 这种同名合并模式是为了兼容老的代码模式，最好还是在一个模块内定义