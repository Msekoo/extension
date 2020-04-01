enum Type { Strong, Week }

class Java {
    helloJava() {
        console.log('Hello Java')
    }
    java: any
}
class Javascript {
    helloJavascript() {
        console.log('Hello Javascript')
    }
    javascript: any
}
// 类型保护函数
function isJava(lang: Java | Javascript): lang is Java{
    return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number){
    let lang = type === Type.Strong ? new Java() : new Javascript()
    // if ((lang as Java).helloJava) {
    //     (lang as Java).helloJava()
    // } else {
    //     (lang as Javascript).helloJavascript()
    // }

    // 1) instanceof 判断一个实例是否属于某个类
    // if (lang instanceof Java) {
    //     lang.helloJava()
    // } else {
    //     lang.helloJavascript()
    // }

    // 2) in 判断一个属性是否属于某个对象
    // if ('java' in lang) {
    //     lang.helloJava()
    // } else {
    //     lang.helloJavascript()
    // }

    // 3) typeof 判断一个变量的类型
    // if (typeof x === 'string') {
    //     x.length
    // } else {
    //     x.toFixed(2)
    // }

    // 4) 类型保护函数 用于封装更复杂的判断逻辑
    // if (isJava(lang)) {
    //     lang.helloJava()
    // } else {
    //     lang.helloJavascript()
    // }

    return lang
}