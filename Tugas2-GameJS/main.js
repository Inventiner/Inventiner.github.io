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
    const utility = document.getElementById('utility');

    button.addEventListener('click', function() {
        button.style.display = 'none';
        utility.style.visibility = 'visible';

        const regisurl = 'https://reqres.in/api/register';
        
        fetch(regisurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            })
        }) .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

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
                this.point = new point(this);
                this.collision = new collisionChecker(ctx);
                this.controller1 = new ControllerPeluru(this.collision);
                this.controller2 = new ControllerMusuh(this, this.collision);
                this.pemain = new Pemain(this, this.controller1);
                this.InputHandlerKB = new InputHandlerKB();
                this.InputHandlerM = new InputHandlerM(canvas);
                
                // Asset bg
                this.bg = document.getElementById('bgimage');
                this.pagi = document.getElementById('bgimage');
                this.siang = document.getElementById('bgimagesiang');
                this.sore = document.getElementById('bgimagesore');
                this.malam = document.getElementById('bgimagemalam');
                this.gover = document.getElementById('gameover');
                
                // Asset gameover
                this.counter = 0;
                this.explode1 = document.getElementById('explode1');
                this.explode2 = document.getElementById('explode2');
                this.explode3 = document.getElementById('explode3');
                this.explode4 = document.getElementById('explode4');
                this.explode5 = document.getElementById('explode5');
                this.explode6 = document.getElementById('explode6');
                this.explode7 = document.getElementById('explode7');
                this.explode8 = document.getElementById('explode8');
                
                this.death = false;
                
                //bgm music
                this.bgm = new Audio('./Assets/FairFight.mp3')
                this.bgm.volume = 0.15;
                this.bgm.loop = true;
                this.bgm.play();
                this.bgm.preload = 'auto';
                
                // first round enemy spawner
                this.rndm1 = Math.floor(Math.random()*4);
                this.rndm2 = Math.floor(Math.random()*2);
                this.controller2.spawn(this.rndm1, 2);
                this.controller2.spawn(this.rndm2, 3);
                this.controller2.spawn((10 - this.rndm1 - this.rndm2), 1);
                utility.scrollIntoView();
            }
            
            update() {
                this.pemain.update(this.InputHandlerKB.keys, this.InputHandlerM.mouse, this.collision);
                this.controller1.update();
                this.controller2.update();
                this.timer.tick();

                if(this.point.getlvl() == 1) {
                    this.bg = this.pagi;
                }
                else if(this.point.getlvl() == 2){
                    this.bg = this.siang;
                }
                else if(this.point.getlvl() == 3){
                    this.bg = this.sore;
                }
                else if(this.point.getlvl() == 4){
                    this.bg = this.malam;
                }
            }

            resetinput() {
                this.InputHandlerKB.reset();
                this.InputHandlerM.reset();
            }

            deathupdate() {
                this.counter++;
            }

            draw(context) {
                ctx.drawImage(this.bg, 0, 0, this.width, this.height);
                this.controller1.draw(context);
                this.controller2.draw(context, this.pemain, this.point);
                this.pemain.draw(context);
            }

            deathdraw(ctx) {
                let i = this.counter;
                if(i % 120 < 15) {
                    ctx.drawImage(this.explode1, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else if(i % 120 < 30) {
                    ctx.drawImage(this.explode2, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else if(i % 120 < 45) {
                    ctx.drawImage(this.explode3, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else if(i % 120 < 60) {
                    ctx.drawImage(this.explode4, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else if(i % 120 < 75) {
                    ctx.drawImage(this.explode5, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else if(i % 120 < 90) {
                    ctx.drawImage(this.explode6, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else if(i % 120 < 105) {
                    ctx.drawImage(this.explode7, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
                else {
                    ctx.drawImage(this.explode2, this.pemain.x, this.pemain.y, this.pemain.width, this.pemain.height);
                }
            }

            stop() {
                this.death = true;
            }
        }
        
        const game = new Game(canvas.width, canvas.height);
        console.log(game);
        
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update();
            game.draw(ctx);
            if(game.death == false){
                requestAnimationFrame(animate);
            }
            else
            {
                game.bgm.pause();
                game.update();
                game.draw(ctx);
                animatedeath();
            }
        }

        function animatedeath() {
            game.deathupdate();
            game.deathdraw(ctx);
            if(game.counter < 160){
                requestAnimationFrame(animatedeath);
            }
            else{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(game.gover, 0, 0, game.width, game.height);
            }
        }
        
        animate();
    });
});