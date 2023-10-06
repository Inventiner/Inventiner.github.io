export class Peluru {
    constructor(pemain) {
        this.pemain = pemain;
        this.width = 64;
        this.height = 64;
        this.count = 0;
        this.x = this.pemain.x;
        this.y = this.pemain.y;
        this.asset = document.getElementById('peluru');
    }

    update() {
    }

    draw(/** @type {CanvasRenderingContext2D} */ context, state){
        console.log("drawing")
        if(state == 1)
        {
            context.drawImage(this.asset, this.x, this.y--);
        }
    }
}