const math = require('../tpl/math.ts')

test('add: 1 + 1 = 2', () => {
    expect(math.add(1, 1)).toBe(2)
})
test('sub: 1 - 2 = -1', () => {
    expect(math.sub(1, 2)).toBe(-1)
})

// ts-jest会进行类型检查 babel-jest不会检查类型,需要npm run type-check
// let x: number = '1' 