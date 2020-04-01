let c1 = require('./a.node')
let c2 = require('./b.node')
let c3 = require('../es6/a')
// import c4 = require('../es6/d')
import c4 from '../es6/d'

console.log("c1", c1)
console.log("c2", c2)

c3.default()
c4()
