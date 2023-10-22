export class point{
    constructor(game){
        this.game = game;
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
        this.levelup.preload = 'auto';

        this.gameover = new Audio('./Assets/gameover.wav')
        this.gameover.volume = 0.15;
        this.gameover.preload = 'auto';

        this.cheat = new Audio('./Assets/cheat.wav')
        this.cheat.volume = 0.15;
        this.cheat.preload = 'auto';
    }

    hit(controller, context) {
        this.lives--;
        this.live.innerHTML = this.lives.toString();
        this.ctx = context;

        this.ctx.fillStyle = 'rgba(242, 38, 19, 0.2)';
        this.ctx.fillRect(0, 0, 800, 800);

        if(this.lives == 0) {
            this.gameover.currentTime = 0;
            if(window.confirm("Gameover! Do you want to try again from the start?\n click yes to retry or click cancel to cheat in more lives!")) {
                fetch("https://ets-pemrograman-web-f.cyclic.app/scores/score", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "nama": prompt("Please enter your name", "Nama Lengkap"),
                        "score": this.point.toString(),
                    }),
                    redirect: 'follow',
                }) .then(response => response.text())
                .then(result => {
                    console.log(result)
                    this.result = JSON.parse(result);
                    if(this.result.status == "success") {
                        window.alert("Sign Up Berhasil, silahkan login!")
                    }
                    else{
                        window.alert(this.result.error);
                    }
                })
                .catch(error => console.log('error', error));
                
                this.gameover.play();
                this.game.stop();
            } else {
                this.lives = 3;
                this.live.innerHTML = this.lives.toString();
                this.game.resetinput();
                this.cheat.currentTime = 0;
                this.cheat.play();
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
        this.slow = Math.floor(Math.random() * (this.spawn)/2);
        this.normal = this.spawn - this.fast - this.slow;
        
        this.spawner = controller;
        this.spawner.spawn(this.slow, 3);
        this.spawner.spawn(this.fast, 2);
        this.spawner.spawn(this.normal, 1);
    }
}