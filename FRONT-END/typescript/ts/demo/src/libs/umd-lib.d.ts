declare namespace umdLib{
    const version: string
    function doSomething(): void
}

export as namespace umdLib // umd库必须的语句

export = umdLib