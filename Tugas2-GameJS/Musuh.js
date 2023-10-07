export class Musuh{
    constructor(value) {
        this.x = Math.floor(Math.random() * 800);
        this.y = Math.floor(Math.random() * 800);
        this.asset = document.getElementById('enemy');
    }

    draw(ctx){
        ctx.drawImage(this.asset, this.x, this.y, 64, 64);
    }


}