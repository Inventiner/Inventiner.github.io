import {Pemain} from './Pemain.js'
import {InputHandlerKB} from './inputkb.js'
import {InputHandlerM} from './inputm.js'
import {ControllerPeluru} from './controllerPeluru.js'
import {ControllerMusuh} from './controllerMusuh.js'
import {timer} from './timer.js'

// TODO: MUSUH, POIN, TIMER?, SUARA, ANIMASI_TAMBAHAN?, BUG-FIX dan Bug-fixing dan bug-fixing dan jangan lupa bugfix

window.addEventListener('load', function() {
    const button = document.getElementById('start');
    const utility = this.document.getElementById('utility');

    button.addEventListener('click', function() {
        button.style.display = 'none';
        utility.style.visibility = 'visible';

        const canvas = /** @type {HTMLCanvasElement} */ document.getElementById('primary');
        canvas.style.border = "2px solid black";
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        
        class Game {
            constructor(width, height) {
                this.width = width;
                this.height = height;
                this.timer = new timer();
                this.controller1 = new ControllerPeluru();
                this.controller2 = new ControllerMusuh(this);
                this.pemain = new Pemain(this, this.controller1);
                this.InputHandlerKB = new InputHandlerKB();
                this.InputHandlerM = new InputHandlerM(canvas);
                this.controller2.spawn(20);
            }
            update() {
                this.pemain.update(this.InputHandlerKB.keys, this.InputHandlerM.mouse);
                this.controller1.update();
                this.timer.tick();
            }
            draw(context) {
                this.bg = document.getElementById('bgimage')
                ctx.drawImage(this.bg, 0, 0, 800, 800);
                this.controller1.draw(context);
                this.controller2.draw(context);
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