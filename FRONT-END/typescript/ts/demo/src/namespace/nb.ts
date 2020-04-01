/// <reference path="na.ts" />
namespace Shape{
    export function square(x: number) {
        return x * x;
    }
}
Shape.square(1)
Shape.circle(1)

import circle = Shape.circle
circle(3)