> awesome-typescript-loader
与ts-loaderd的主要区别
1） 更适合与Babel集成，使用Babel的转义和缓存
2）不需要安装额外的插件，就可以把类型检查放在独立的进程中进行

> bebel做语言转换，ts做类型检查，见TS-BABEL
但命名空间、类型断言、常量枚举、默认导出在babel中不支持

> 如果没有使用过Babel，首选typescript自身的编译器可配合（ts-loader使用）
如果项目中已经使用babel，安装@babel/preset-typescript（可配合tsc做类型检查）
两种编译工具不要混用