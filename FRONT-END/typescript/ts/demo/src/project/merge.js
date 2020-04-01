var po = {
    x: 1,
    y: 2,
    foo: function (bar) {
        return bar;
    }
};
// 命名空间的合并，不能重复实现
// 命名空间和函数声明合并
function Libs() { }
var Lib;
(function (Lib) {
    Lib.version = '1.0';
})(Lib || (Lib = {}));
console.log(Lib.version);
// 命名空间和类声明合并
var CC = /** @class */ (function () {
    function CC() {
    }
    return CC;
}());
(function (CC) {
    CC.state = 1; // 相当于给类增加了静态属性
})(CC || (CC = {}));
console.log(CC.state);
// 命名空间和函数和类合并需要放在其后面
// 命名空间和枚举进行合并，顺序可变
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
(function (Color) {
    function mix() { } // 相当于给枚举增加了一个函数
    Color.mix = mix;
})(Color || (Color = {}));
// 这种同名合并模式是为了兼容老的代码模式，最好还是在一个模块内定义
