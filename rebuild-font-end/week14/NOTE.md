* 浏览器连续的dom操作会合并
* js实现动画时，第一次dom操作，会在第一个requestAnimationFrame渲染，动画的下一帧需要在requestAnimationFrame渲染，可能嵌套使用requestAnimationFrame才能生效
* setTimeout( ,16) 无需嵌套，同样可实现动画
