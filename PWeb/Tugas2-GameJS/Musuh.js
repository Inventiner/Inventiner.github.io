export class Musuh{
    constructor(type) {
        this.randpos = Math.floor(Math.random() * 4);
        this.randx = Math.floor(Math.random() * 200);
        this.randx2 = Math.floor(Math.random() * 800);
        this.randy = Math.floor(Math.random() * 200);
        this.randy2 = Math.floor(Math.random() * 800);
        this.x = 0;
        this.y = 0;
        this.type = type;

        this.count = 0;
        this.width = 27;
        this.height = 48;
        this.speed = 0.4;
        this.vx = 0;
        this.vy = 0;
        
        this.asset = document.getElementById('enemyU');
        this.enemyU = document.getElementById('enemyU');
        this.enemyR = document.getElementById('enemyR');
        this.enemyD = document.getElementById('enemyD');
        this.enemyL = document.getElementById('enemyL');
        this.enemyU2 = document.getElementById('enemyU2');
        this.enemyR2 = document.getElementById('enemyR2');
        this.enemyD2 = document.getElementById('enemyD2');
        this.enemyL2 = document.getElementById('enemyL2');

        if(this.randpos == 0){
            this.x = 0 - this.randx;
            this.y = this.randy2;
        }
        else if(this.randpos == 1){
            this.x = 800 + this.randx;
            this.y = this.randy2;
        }
        else if(this.randpos == 2){
            this.y = 0 - this.randy;
            this.x = this.randx2;
        }
        else if(this.randpos == 3){
            this.y = 800 + this.randy;
            this.x = this.randx2;
        }

        if(this.type == 2){
            this.speed = 0.8;
        }

        if(this.type == 3){
            this.speed = 0.2;
        }

    }
    
    getshortestpath(pemain){
        this.count++;
        this.distx = (pemain.x + pemain.width/2) - (this.x + this.width/2);
        this.disty = (pemain.y + pemain.height/2) - (this.y + this.height/2);
        
        if(Math.abs(this.distx) > Math.abs(this.disty)) {
            if(this.distx < 0){
                this.vx = this.speed * -1;
                this.vy = 0;

                if(this.type == 1){
                    if(this.count % 12 <= 6) {
                        this.asset = this.enemyL;
                    }
                    else {
                        this.asset = this.enemyL2;
                    }
                }
                else if(this.type == 2){
                    if(this.count % 8 <= 4) {
                        this.asset = this.enemyL;
                    }
                    else {
                        this.asset = this.enemyL2;
                    }
                }
                else if(this.type == 3){
                    if(this.count % 24 <= 12) {
                        this.asset = this.enemyL;
                    }
                    else {
                        this.asset = this.enemyL2;
                    }
                }
            }
            else {
                this.vx = this.speed;
                this.vy = 0;
                if(this.type == 1){
                    if(this.count % 12 <= 6) {
                        this.asset = this.enemyR;
                    }
                    else {
                        this.asset = this.enemyR2;
                    }
                }
                else if(this.type == 2){
                    if(this.count % 8 <= 4) {
                        this.asset = this.enemyR;
                    }
                    else {
                        this.asset = this.enemyR2;
                    }
                }
                else if(this.type == 3){
                    if(this.count % 24 <= 12) {
                        this.asset = this.enemyR;
                    }
                    else {
                        this.asset = this.enemyR2;
                    }
                }
            }
        }
        else{
            if(this.disty < 0){
                this.vy = this.speed * -1;
                this.vx = 0;
                if(this.type == 1){
                    if(this.count % 12 <= 6) {
                        this.asset = this.enemyU;
                    }
                    else {
                        this.asset = this.enemyU2;
                    }
                }
                else if(this.type == 2){
                    if(this.count % 8 <= 4) {
                        this.asset = this.enemyU;
                    }
                    else {
                        this.asset = this.enemyU2;
                    }
                }
                else if(this.type == 3){
                    if(this.count % 24 <= 12) {
                        this.asset = this.enemyU;
                    }
                    else {
                        this.asset = this.enemyU2;
                    }
                }
            }
            else {
                this.vy = this.speed
                this.vx = 0;
                if(this.type == 1) {
                    if(this.count % 12 <= 6) {
                        this.asset = this.enemyD;
                    }
                    else {
                        this.asset = this.enemyD2;
                    }
                }
                else if(this.type == 2){
                    if(this.count % 8 <= 4) {
                        this.asset = this.enemyD;
                    }
                    else {
                        this.asset = this.enemyD2;
                    }
                }
                else if(this.type == 3){
                    if(this.count % 24 <= 12) {
                        this.asset = this.enemyD;
                    }
                    else {
                        this.asset = this.enemyD2;
                    }
                }
            }
        }
    }
    
    draw(ctx, pemain){
        this.getshortestpath(pemain);
        this.x += this.vx;
        this.y += this.vy;
        ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
    }
}