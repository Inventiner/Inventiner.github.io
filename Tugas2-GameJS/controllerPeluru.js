import {Peluru} from './peluru.js'

export class ControllerPeluru {
    ArPeluru = [];
    timer = 0;

    constructor() {
    }

    tembak(pemain, heading) {
        if(this.timer <= 0){
            this.ArPeluru.push(new Peluru(pemain, heading));
            this.timer = 60;
            return true;
        }
        else {
            return false;
        }
    }

    update() {
        this.timer--;
    }

    draw(ctx){
        // console.log(this.ArPeluru); // debugger

        this.ArPeluru.forEach((Peluru) => {
            Peluru.draw(ctx);
            if(Peluru.outofbound()){
                this.ArPeluru.splice(Peluru, 1);
            }
        });
    }
}