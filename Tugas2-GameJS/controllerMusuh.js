import {Musuh} from "./Musuh.js"

export class ControllerMusuh {
    Armusuh = [];
    constructor(game, collision){
        this.game = game;
        this.collision = collision;
    }

    spawn(value, type){
        for(let i = 0; i < value; i++)
        {
            this.Armusuh.push(new Musuh(type))
        }
    }

    update(){
        this.collision.updateEnemy(this.Armusuh);
    }

    draw(ctx, pemain, point){
        this.point = point;
        this.Armusuh = this.collision.enemyCollision(this, this.point);
        this.Armusuh = this.collision.playerCollision(this, this.point);

        this.Armusuh.forEach((Musuh) => {
            Musuh.draw(ctx, pemain);
        });
    }
    
}