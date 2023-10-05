import {Pemain} from './Pemain.js'
import {InputHandler} from './input.js'

window.addEventListener('load', function() {
    const canvas = /** @type {HTMLCanvasElement} */ document.getElementById('primary');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Pemain(this);
            this.InputHandler = new InputHandler();
        }
        update() {
            this.player.update(this.InputHandler.keys);
        }
        draw(context) {
            this.player.draw(context);
        }
    }
    
    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();
    
});