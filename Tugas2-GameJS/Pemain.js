export class Pemain {
    constructor(game, controller1) {
        this.game = game;
        this.width = 64;
        this.height = 64;
        this.count = 0;
        this.cooldown = 0;

        this.state = 1;
        this.controller1 = controller1;
        this.speed = 1.5;

        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.asset = document.getElementById('tankUp');
        this.tempImg = this.asset;

        this.tankUp = document.getElementById('tankUp');
        this.tankUp2 = document.getElementById('tankUp2');
        this.tankUpSht = document.getElementById('tankUpSht');

        this.tankDown = document.getElementById('tankDown');
        this.tankDown2 = document.getElementById('tankDown2');
        this.tankDownSht = document.getElementById('tankDownSht');

        this.tankLeft = document.getElementById('tankLeft');
        this.tankLeft2 = document.getElementById('tankLeft2');
        this.tankLeftSht = document.getElementById('tankLeftSht');

        this.tankRight = document.getElementById('tankRight');
        this.tankRight2 = document.getElementById('tankRight2');
        this.tankRightSht = document.getElementById('tankRightSht');

        this.shoot = new Audio('./Assets/shoot.wav')
        this.shoot.volume = 0.1;

        this.tanksound = new Audio('./Assets/tank.wav')
        this.tanksound.volume = 0.05;
    }

    update(input, mouse, collision) {
        this.count += 1;
        this.cooldown -= 1;
        this.collision = collision;

        if(this.cooldown <= 0)
        {
            this.asset = this.tempImg;
        }
        
        if(input.includes(' ') || mouse.includes('LeftClick')) {
            this.success = this.controller1.tembak(this, this.state);
            if(this.success) {
                this.shoot.currentTime = 0;
                this.shoot.play();
                this.cooldown = 10;
                switch(this.state) {
                    case 1:
                        this.asset = this.tankUpSht;
                        break;
                    case 2:
                        this.asset = this.tankRightSht;
                        break;
                    case 3:
                        this.asset = this.tankDownSht;
                        break;
                    case 4:
                        this.asset = this.tankLeftSht;
                        break;
                    default:
                        break;
                }
            }
            else if(this.cooldown <= 0)
            {
                this.asset = this.tempImg;
            }
        }

        if (input.includes('ArrowDown') || input.includes('s') || input.includes('S')) {
            this.state = 3;
            this.y += this.speed;
            this.tanksound.currentTime = 0;
            this.tanksound.play();

            if(this.y > this.game.height - this.height)
            {
                this.y = this.game.height - this.height;
            }

            if(this.count % 2 == 0 && this.cooldown <= 0){
                this.asset = this.tankDown;
                this.tempImg = this.asset;
            }
            else if(this.count % 2 == 1 && this.cooldown <= 0){
                this.asset = this.tankDown2;
                this.tempImg = this.asset;    
            }
            else{
                this.tempImg = this.tankDown;
            }
        }

        else if(input.includes('ArrowUp') || input.includes('w') || input.includes('W')) {
            this.state = 1;
            this.y -= this.speed; 
            this.tanksound.play();

            if(this.y < 0)
            {
                this.y = 0;
            }

            if(this.count % 2 == 0 && this.cooldown <= 0){
                this.asset = this.tankUp;
                this.tempImg = this.asset;
            }
            else if(this.count % 2 == 1 && this.cooldown <= 0){
                this.asset = this.tankUp2;
                this.tempImg = this.asset;
            }
            else{
                this.tempImg = this.tankUp;
            }
        }

        else if(input.includes('ArrowLeft') || input.includes('a') || input.includes('A')) {
            this.state = 4;
            this.x -= this.speed;
            this.tanksound.play();

            if(this.x < 0)
            {
                this.x = 0;
            }

            if(this.count % 2 == 0 && this.cooldown <= 0){
                this.asset = this.tankLeft;
                this.tempImg = this.asset;
            }
            else if(this.count % 2 == 1 && this.cooldown <= 0){
                this.asset = this.tankLeft2;
                this.tempImg = this.asset;
            }
            else {
                this.tempImg = this.tankLeft;
            }
        }

        else if(input.includes('ArrowRight') || input.includes('d') || input.includes('D')) {
            this.state = 2;
            this.x += this.speed;
            this.tanksound.play();

            if(this.x > this.game.width - this.width)
            {
                this.x = this.game.width - this.width
            }

            if(this.count % 2 === 0 && this.cooldown <= 0){
                this.asset = this.tankRight;
                this.tempImg = this.asset;
            }
            else if(this.count % 2 == 1 && this.cooldown <= 0){
                this.asset = this.tankRight2;
                this.tempImg = this.asset;
            }
            else{
                this.tempImg = this.tankRight;
            }
        }

        this.collision.updateplayer(this.x, this.y);
    }

    draw( /** @type {CanvasRenderingContext2D} */ context){
        context.drawImage(this.asset, this.x, this.y, 64, 64);
    }
}