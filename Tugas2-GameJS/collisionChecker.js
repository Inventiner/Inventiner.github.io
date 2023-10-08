export class collisionChecker{
    bullet = [];
    enemy = [];
    
    constructor(ctx){
        this.killmon = new Audio('./Assets/Enemyhit.wav')
        this.killmon.volume = 0.15;
        this.hit = new Audio('./Assets/Hit.wav')
        this.hit.volume = 0.15;

        this.ctx = ctx;
        this.pemainx = 0;
        this.pemainy = 0;
        this.pemainwidth    = 52;
        this.pemainheight   = 52;

        this.peluruwidth    = 30;
        this.peluruheight   = 30;

        this.musuhwidth     = 30;
        this.musuhheight    = 50;

        this.asset = document.getElementById('Explosion')
    }

    updatebullet(Arpeluru){
        this.bullet = Arpeluru;
    }

    updateEnemy(Armusuh){
        this.enemy = Armusuh;
        console.log(this.enemy);
    }

    updateplayer(x, y){
        this.pemainx = x;
        this.pemainy = y;
    }

    playerCollision(controller, point){ // mengecek apakah musuh mengenai tank
        this.point = point;
        try{
            this.enemy.forEach((Musuh) => {
                if( (Musuh.x <= this.pemainx + this.pemainwidth && Musuh.y <= this.pemainy + this.pemainheight) &&
                (Musuh.x + this.musuhwidth >= this.pemainx && Musuh.y <= this.pemainy + this.pemainheight) &&
                (Musuh.x <= this.pemainx + this.pemainwidth && Musuh.y + this.musuhheight >= this.pemainy) &&
                (Musuh.x + this.musuhwidth >= this.pemainx && Musuh.y + this.musuhwidth >= this.pemainy)) {
                    this.enemy.splice(this.enemy.indexOf(Musuh), 1);
                    this.point.hit(controller);
                    this.hit.currentTime = 0;
                    this.hit.play();
                    throw new Error("break");
                }
            });
        } catch (error) {
        }

        return this.enemy;
    }

    enemyCollision(controller, point){ // mengecek apakah peluru mengenai musuh
        this.point = point;
        try{
            this.enemy.forEach((Musuh) => {
                this.bullet.forEach((Peluru) => {
                    if((Musuh.x <= Peluru.x + this.peluruwidth && Musuh.y <= Peluru.y + this.peluruheight) &&
                    (Musuh.x + this.musuhwidth >= Peluru.x && Musuh.y <= Peluru.y + this.peluruheight) &&
                    (Musuh.x <= Peluru.x + this.peluruwidth && Musuh.y + this.musuhheight >= Peluru.y) &&
                    (Musuh.x + this.musuhwidth >= Peluru.x && Musuh.y + this.musuhwidth >= Peluru.y)) {
                        this.bullet.splice(this.bullet.indexOf(Peluru), 1);
                        this.enemy.splice(this.enemy.indexOf(Musuh), 1);
                        this.point.kill(controller);
                        this.killmon.currentTime = 0;
                        this.killmon.play();
                        
                        throw new Error("break");
                    }
                });
            });
        } catch (error) {
        }

        return this.enemy;
    }

}