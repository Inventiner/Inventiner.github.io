import {Musuh} from "./Musuh.js"

export class ControllerMusuh {
    Armusuh = [];
    constructor(game){
        this.game = game;
    }

    spawn(value){
        for(let i = 0; i < value; i++)
        {
            this.Armusuh.push(new Musuh())
        }
    }

    draw(ctx){
        console.log(this.Armusuh);
        // this.ArPeluru.forEach((Peluru) => console.log(Peluru));
        this.Armusuh.forEach((Musuh) => {
            Musuh.draw(ctx);
            // if(Musuh.outofbound()){
            //     this.ArPeluru.splice(Peluru, 1);
            // }
        });
    }
    
}