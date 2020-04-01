// 声明文件
declare function globalLib(opyions: globalLib.Options): void

declare namespace globalLib {
    const version: string;
    function dosomething(): void
    interface Options{
        [key: string]: any
    }
}