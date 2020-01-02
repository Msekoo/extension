class Round_item{
    constructor (index, x, y, useChache) {
        this.index = index
        this.x = x
        this.y = y
        this.useChache = useChache
        // 使用离屏渲染，通过cachaCanvas离屏绘制
        this.cacheCanvas = document.createElement("canvas")
        this.cacheCtx = this.cacheCanvas.getContext("2d")
        this.r = Math.random() * 2 + 1
        this.cacheCanvas.width = 6 * this.r
        this.cacheCanvas.height = 6 * this.r

        let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2
        this.color = `rgba(255,255,255,${alpha})`

        if(useChache) this.cache()
    }
    draw(context) {
        if (!this.useChache) {
            context.fillStyle = this.color
            context.shadowBlur = this.r * 2
            context.beginPath()
            context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
            context.closePath()
            context.fill()
        } else {
            // 需要使用缓存的时候，将cacheCanvas的内容绘制到页面内的canvas上
            context.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r)
        }
    }
    move(context) {
        this.y -= 0.15
        if (this.y <= 10)
            this.y = HEIGHT + 10
        this.draw(context)
    }
    cache() {
        // 状态入栈，保存canvas全部状态
        this.cacheCtx.save()
        this.cacheCtx.fillStyle = this.color
        this.cacheCtx.shadowColor = 'white'
        this.cacheCtx.shadowBlur = this.r * 2
        this.cacheCtx.beginPath()
        this.cacheCtx.arc(this.r * 3, this.r * 3, this.r, 0 , 2 * Math.PI)
        this.cacheCtx.closePath()
        this.cacheCtx.fill()
        // 弹出栈顶状态，恢复canvas最近保存的状态
        this.cacheCtx.restore()
    }
}