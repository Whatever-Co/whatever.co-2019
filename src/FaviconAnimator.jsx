var $ = require('jquery')


class FaviconAnimator {

    constructor() {
        this.metaIcon = $('link[rel="shortcut icon"]')[0]
        this.canvas = document.createElement('canvas')
        this.canvas.width = 32
        this.canvas.height = 32
        this.context = this.canvas.getContext('2d')
        this.index = 0
        this.sprite = new Image()
        this.sprite.onload = () => this._update()
        this.sprite.src = "/assets/favicons.png"
    }

    _update() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        var size = 32
        var x = this.index % 7
        var y = Math.floor(this.index / 7)
        this.context.drawImage(this.sprite, x * size, y * size, size, size, 0, 0, this.canvas.width, this.canvas.height)
        this.metaIcon.href = this.canvas.toDataURL()
        if (++this.index == 21) {
            this.index = 0
        }
        setTimeout(this._update.bind(this), this.index == 1 ? 2000 : 200)
    }

}

module.exports = FaviconAnimator
