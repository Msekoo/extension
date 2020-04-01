import $ from 'jquery'

$('.app').css('color', 'red')

globalLib({ x: 1 })
globalLib.dosomething()

import moduleLib from './module-lib'
moduleLib.doSomething()

// import umdLib from './umd-lib'
umdLib.doSomething()

// 模块化的插件
import m from 'moment'
// 给外部的类库增加自定义的方法
declare module 'moment' {
    export function myFunction(): void
}
m.myFunction = () => {

}
// 全局插件
declare global{
    namespace globalLib {
        function doAnything(): void
    }
}
// 会对全局文件造成一定的污染，一般不建议这么做
globalLib.doAnything = () => {
    
}