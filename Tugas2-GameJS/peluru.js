export class Peluru {
    constructor(pemain, heading) {
        this.pemain = pemain;
        this.width = 32;
        this.height = 32;
        this.count = 0;

        this.speed = 3;
        this.vx = 0; // perubahan x
        this.vy = 0; // perubahan y
        this.oub = 0; // mengecek out of bound
        this.heading = heading;
        this.asset = document.getElementById('peluruU');

        this.animation = document.getElementById('tembak');
        this.peluruU = document.getElementById('peluruU');
        this.peluruR = document.getElementById('peluruR');
        this.peluruD = document.getElementById('peluruD');
        this.peluruL = document.getElementById('peluruL');

        switch(this.heading) {
            case 1:
                this.x = this.pemain.x + this.width/2;
                this.y = this.pemain.y - (this.pemain.height/2 - this.pemain.height/20);
                this.vy = (this.speed * -1);
                this.asset = this.peluruU;
                break;
            case 2:
                this.x = this.pemain.x + (this.pemain.width - this.pemain.width/10);
                this.y = this.pemain.y + this.height/2;
                this.vx = this.speed;
                this.asset = this.peluruR;
                break;
            case 3:
                this.x = this.pemain.x + this.width/2;
                this.y = this.pemain.y + (this.pemain.height - this.pemain.height/10);
                this.vy = this.speed;
                this.asset = this.peluruD;
                break;
            case 4:
                this.x = this.pemain.x - (this.pemain.width/2 - this.pemain.width/20);
                this.y = this.pemain.y +this.height/2;
                this.vx = (this.speed * -1);
                this.asset = this.peluruL;
                break;
            default:
                break;
        }
    }

    outofbound() {
        if(this.x <= (0 - this.width) || this.y <= (0 - this.height) || this.y >= this.pemain.game.height || this.x >= this.pemain.game.width) {
            return true;
        }
        return false;
    }

    draw(/** @type {CanvasRenderingContext2D} */ context){
        this.x += this.vx;
        this.y += this.vy;
        context.drawImage(this.asset, this.x, this.y, this.width, this.height);
    }
}