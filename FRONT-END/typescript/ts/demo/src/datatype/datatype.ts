let bool: boolean = true
let num: number | null | undefined= 123


// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number | string> = [1, 2, 3, '8']

// 元组： 特殊数组，限定类型与个数, 可通过push添加新元素，但不可越界访问（不建议）
let tuple: [number, string] = [0, '1']

// 函数,通常返回类型可省略
let add = (x: number, y: number): number => x + y
let compute: (x: number, y: number) => number
compute = (a, b) => a + b

// 对象
let obj: { a: number, b: number } = { a: 1, b: 2 }

// symbol
let s1: symbol = Symbol()
let s2 = Symbol()

// undefined, null
let un: undefined = undefined
let nu: null = null

// void
let noReturn = () => {}

// any
let x

// never, 永远没有返回值类型
let error = () => {
    throw new Error('error')
}
let endless = () => {
    while (true) { }
}









