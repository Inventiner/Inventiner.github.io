export class point{
    constructor(){
        this.base = 75;
        this.target = 100;
        this.poin = 0;
        this.lvl = 1;
        this.lives = 5;
        this.point = document.getElementById('point');
        this.level = document.getElementById('level');
        this.live = document.getElementById('lives');

        this.updatep = this.poin.toString() + "/" + this.target.toString();
        this.point.innerHTML = this.updatep;
        this.level.innerHTML = this.lvl.toString();
        this.live.innerHTML = this.lives.toString();

        this.levelup = new Audio('./Assets/levelup.wav')
        this.levelup.volume = 0.15;

        this.gameover = new Audio('./Assets/gameover.wav')
        this.gameover.volume = 0.15;
    }

    hit(controller) {
        this.lives--;
        this.live.innerHTML = this.lives.toString();
        if(this.lives == 0) {
            this.gameover.currentTime = 0;
            this.gameover.play();
            if(window.confirm("Gameover! Do you want to try again from the start?\n click yes to retry or click cancel to cheat in more lives!")) {
                setTimeout(() => window.location.reload(), 3000);
            } else {
                this.lives = 3;
                this.live.innerHTML = this.lives.toString();
            }
        }

        this.kill(controller);
    }

    getlvl() {
        return this.lvl;
    }

    kill(controller) {
        this.poin += 10;
        if(this.poin >= this.target) {
            this.lvl++;
            this.target += this.base * this.lvl;
            this.nextlevel(controller);
            this.levelup.currentTime = 0;
            this.levelup.play();
        }

        this.updatep = this.poin.toString() + "/" + this.target.toString();

        this.point.innerHTML = this.updatep;
        this.level.innerHTML = this.lvl.toString();
    }

    nextlevel(controller) {
        this.spawn = (this.target - this.poin)/10;
        this.fast = Math.floor(Math.random() * (this.spawn)/2);
        this.normal = this.spawn - this.fast;
        this.spawner = controller;
        this.spawner.spawn(this.fast, 2);
        this.spawner.spawn(this.normal, 1);
    }
}