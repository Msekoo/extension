const version = '1.0.2'

function doSomething() {
    console.log(`moduleLib do something`)
}

function moduleLib(options) {
    console.log(options)
}

moduleLib.version = version
moduleLib.doSomething = doSomething

// export default moduleLib
module.exports = moduleLib