interface List {
    readonly id: number; // 只读属性
    name: string;
    // [x: string]: any; // 字符串索引签名
    age?: number // 可选属性
}
interface Result {
    data: List[]
}
function render(result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name)
    })
}
let result = {
    data: [
        {id: 1, name: 'A', sex: 'male'}, // 鸭式变形法
        {id: 2, name: 'B', age: 3}
    ]
}
// render({
//     data: [
//         {id: 1, name: 'A', sex: 'male'}, // 对象字面量会检查，1、定义变量 2、类型断言 3、字符串索引签名
//         {id: 2, name: 'B'}
//     ]
// } as Result)

render(result)

interface stringArray {
    [index: number]: string
}
let chars: stringArray = ['a', 'b']
// 字符串索引
interface Names {
    [x: string]: string;
    [y: number]: string; // 可混用，但是数字索引的类型必须是字符串索引类型的子类型
}

// 声明函数的几种方式
// 变量声明
// let adds: (x: number, y: number) => number
// 接口声明
// interface Add {
//     (x: number, y: number): number
// }
// type和interface多数情况下有相同的功能，定义类型有一些区别，type：不是创建新的类型，而是给给定类型起一个名字
// type可以进行联合、交叉等操作，引用起来简介。interface：创建新的类型，接口之间可以继承、声明合并。建议优先使用interface
// 混合接口一般是为了第三方类库写声明文件时会用到，很多类库名称可以直接当函数调用，也可以有些属性和方法。
// 用混合接口声明函数和用接口声明函数的区别是，接口不能声明类的构造函数（即不带名称的函数），但混合接口可以，其他一样
// 类型别名
type Add = (x: number, y: number) => number
let adds: Add = (a, b) => a + b
// 混合接口
interface Lib {
    (): void;
    version: string;
    doSomething(): void;
}

function getLib() {
    let lib: Lib = (() => { }) as Lib;
    lib.version = '1.0';
    lib.doSomething = () => { console.log(`111`) }
    return lib;
}
let lib1 = getLib();
lib1()
lib1.doSomething()
lib1.version = '2.0'
console.log("lib1", lib1)
let lib2 = getLib()
console.log("lib2", lib2.version)




