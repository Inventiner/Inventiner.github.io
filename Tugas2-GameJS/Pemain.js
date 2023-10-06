export class Pemain {
    constructor(game, controller1) {
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.count = 0;
        this.state = 0;
        this.controller1 = controller1;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.asset = document.getElementById('tankUp');

        this.tankUp = document.getElementById('tankUp');
        this.tankUp2 = document.getElementById('tankUp2');
        this.tankDown = document.getElementById('tankDown');
        this.tankDown2 = document.getElementById('tankDown2');
        this.tankLeft = document.getElementById('tankLeft');
        this.tankLeft2 = document.getElementById('tankLeft2');
        this.tankRight = document.getElementById('tankRight');
        this.tankRight2 = document.getElementById('tankRight2');
        
    }

    update(input, mouse) {
        this.count += 1;

        if(input.includes(' ') || mouse.includes('LeftClick')) {
            console.log("shoot");
            this.controller1.tembak(this, this.state);
        }

        if (input.includes('ArrowDown') || input.includes('s') || input.includes('S')) {
            this.state = 3;
            this.y++;
            if(this.y > this.game.height - this.height)
            {
                this.y = this.game.height - this.height;
            }

            if(this.count % 2 == 0) {
                this.asset = tankDown;
            }
            else {
                this.asset = tankDown2;
            }
        }
        else if(input.includes('ArrowUp') || input.includes('w') || input.includes('W')) {
            this.state = 1;
            this.y--;  
            if(this.y < 0)
            {
                this.y = 0;
            }

            if(this.count % 2 == 0)
            this.asset = tankUp;
            else
            this.asset = tankUp2;
        }
        else if(input.includes('ArrowLeft') || input.includes('a') || input.includes('A')) {
            this.state = 4;
            this.x--;

            if(this.x < 0)
            {
                this.x = 0;
            }

            if(this.count % 2 == 0)
            this.asset = tankLeft;
            else
            this.asset = tankLeft2;
        }
        else if(input.includes('ArrowRight') || input.includes('d') || input.includes('D')) {
            this.state = 2;
            this.x++;

            if(this.x > this.game.width - this.width)
            {
                this.x = this.game.width - this.width
            }

            if(this.count % 2 === 0)
            this.asset = tankRight;
            else
            this.asset = tankRight2;
        }
    }

    draw( /** @type {CanvasRenderingContext2D} */ context){
        context.drawImage(this.asset, this.x, this.y, 64, 64);
    }

    getState() {
        return this.state;
    }

}