export class Pemain {
    constructor(game) {
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.asset = document.getElementById('tankUp');
        this.tankUp = document.getElementById('tankUp');
        this.tankDown = document.getElementById('tankDown');
        this.tankLeft = document.getElementById('tankLeft');
        this.tankRight = document.getElementById('tankRight');
    }
    update(/** @type {Array} */input) {
        if (input.includes('ArrowDown') || input.includes('s') || input.includes('S')) {
            this.y++;
            this.asset = this.tankDown;
        }
        else if(input.includes('ArrowUp') || input.includes('w') || input.includes('W')) {
            this.y--;
            this.asset = tankUp;
        }
        else if(input.includes('ArrowLeft') || input.includes('a') || input.includes('A')) {
            this.x--;
            this.asset = tankLeft;
        }
        else if(input.includes('ArrowRight') || input.includes('d') || input.includes('D')) {
            this.x++;
            this.asset = tankRight;
        }
    }

    draw( /** @type {CanvasRenderingContext2D} */ context){
        context.drawImage(this.asset, this.x, this.y, 64, 64);
    }

}