class Round_item{
    constructor (index, x, y) {
        this.index = index
        this.x = x
        this.y = y
        this.r = Math.random() * 2 + 1
        let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2
        this.color = `rgba(255,255,255,${alpha})`
    }
    draw(context) {
        context.fillStyle = this.color
        context.shadowBlur = this.r * 2
        context.beginPath()
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        context.closePath()
        context.fill()
    }
    move(context) {
        this.y -= 0.15
        if (this.y <= 10)
            this.y = HEIGHT + 10
        this.draw(context)
    }
}