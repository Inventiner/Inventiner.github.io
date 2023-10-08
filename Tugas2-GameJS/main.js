import {Pemain} from './Pemain.js'
import {InputHandlerKB} from './inputkb.js'
import {InputHandlerM} from './inputm.js'
import {ControllerPeluru} from './controllerPeluru.js'
import {ControllerMusuh} from './controllerMusuh.js'
import {timer} from './timer.js'
import {collisionChecker} from './collisionChecker.js'
import {point} from './point.js'

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
                this.point = new point();
                this.collision = new collisionChecker(this.ctx);
                this.controller1 = new ControllerPeluru(this.collision);
                this.controller2 = new ControllerMusuh(this, this.collision);
                this.pemain = new Pemain(this, this.controller1);
                this.InputHandlerKB = new InputHandlerKB();
                this.InputHandlerM = new InputHandlerM(canvas);
                this.bg = document.getElementById('bgimage')
                this.siang = document.getElementById('bgimagesiang');
                this.sore = document.getElementById('bgimagesore');
                this.malam = document.getElementById('bgimagemalam');
                
                //bgm music
                this.bgm = new Audio('./Assets/FairFight.wav')
                this.bgm.volume = 0.15;
                this.bgm.loop = true;
                this.bgm.play();

                // first round enemy spawner
                this.rndm = Math.floor(Math.random()*4);
                this.controller2.spawn(this.rndm, 2);
                this.controller2.spawn((10 - this.rndm), 1);
            }
            update() {
                this.pemain.update(this.InputHandlerKB.keys, this.InputHandlerM.mouse, this.collision);
                this.controller1.update();
                this.controller2.update();
                this.timer.tick();
                if(this.point.getlvl() == 2){
                    this.bg = this.siang;
                }
                else if(this.point.getlvl() == 3){
                    this.bg = this.sore;
                }
                else if(this.point.getlvl() == 4){
                    this.bg = this.malam;
                }
            }
            draw(context) {
                ctx.drawImage(this.bg, 0, 0, 800, 800);
                this.controller1.draw(context);
                this.controller2.draw(context, this.pemain, this.point);
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