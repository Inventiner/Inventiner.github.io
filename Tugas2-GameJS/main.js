import {Pemain} from './Pemain.js'
import {Peluru} from './peluru.js'
import {InputHandlerKB} from './inputkb.js'
import {InputHandlerM} from './inputm.js'
import {ControllerPeluru} from './controllerPeluru.js'

window.addEventListener('load', function() {
    /**@type {HTMLButtonElement} */ const button = document.getElementById('start');
    
    button.addEventListener('click', function() {
        button.style.display = 'none';

        const canvas = /** @type {HTMLCanvasElement} */ document.getElementById('primary');
        canvas.style.border = "2px solid black";
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        
        class Game {
            constructor(width, height) {
                this.width = width;
                this.height = height;
                this.controller1 = new ControllerPeluru(this.canvas);
                this.pemain = new Pemain(this, this.controller1);
                this.peluru = new Peluru(this.pemain);
                this.InputHandlerKB = new InputHandlerKB();
                this.InputHandlerM = new InputHandlerM(canvas);
                
            }
            update() {
                this.pemain.update(this.InputHandlerKB.keys, this.InputHandlerM.mouse);
                this.controller1.update();
            }
            draw(context) {
                this.bg = document.getElementById('bgimage')
                ctx.drawImage(this.bg, 0, 0, 800, 800);
                this.controller1.draw(context);
                this.pemain.draw(context);
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
});