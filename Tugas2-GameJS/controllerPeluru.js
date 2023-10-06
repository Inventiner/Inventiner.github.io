import {Peluru} from './peluru.js'

export class ControllerPeluru {
    ArPeluru = [];
    timer = 0;
    state = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }

    tembak(pemain, state) {
        if(this.timer <= 0){
            this.ArPeluru.push(new Peluru(pemain));
            this.timer = 80;
            this.state = state;
        }
    }

    update() {
        this.timer--;
    }

    draw(ctx){
        console.log(this.ArPeluru);
        // this.ArPeluru.forEach((Peluru) => console.log(Peluru));
        this.ArPeluru.forEach((Peluru) => Peluru.draw(ctx, this.state));
    }
}