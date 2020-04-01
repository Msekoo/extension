// 函数定义
function add1(x: number, y: number) {
    return x + y
}
// 后三种只是定义，未实现
// 变量定义函数类型
let add2: (x: number, y: number) => number
// 类型别名定义函数类型
type add3 = (x: number, y: number) => number
// 接口定义函数类型
interface add4 {
    (x: number, y: number): number
}
// 可选参数必须放在必选参数之后
function add5(x: number, y?: number) {
    return y ? x + y : x;
}
function add6(x: number, y = 1, z: number, q = 1) {
    return x + y + z + q;
}
console.log(add6(1, undefined, 3))
function add7(x: number, ...rest: number[]) {
    return x + rest.reduce((pre, cur) => pre + cur)
}
console.log(add7(1, 2, 3, 4))

function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any{
    let first = rest[0]
    if (typeof first === 'string') {
        return rest.join('')
    }
    if (typeof first === 'number') {
        return rest.reduce((pre, cur) => pre + cur)
    }
}
