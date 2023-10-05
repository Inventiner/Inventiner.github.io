export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e =>{
            if ((e.key === 'ArrowDown'  || e.key === 'S' || e.key === 's' ||
                 e.key === 'ArrowUp'    || e.key === 'W' || e.key === 'w' ||
                 e.key === 'ArrowLeft'  || e.key === 'A' || e.key === 'a' ||
                 e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd')
                 && this.keys.indexOf(e.key) === -1)
            {
                console.log("keydown");
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e =>{
            if (e.key === 'ArrowDown' || e.key === 'S' || e.key === 's' ||
                e.key === 'ArrowUp' || e.key === 'W' || e.key === 'w' ||
                e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a' ||
                e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd')
            {
                console.log("keyup");
                console.log(e.key);
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}