export class InputHandlerM {
    constructor(/** @type {HTMLCanvasElement} */ canvas){
        this.mouse = [];

        canvas.addEventListener('mousedown', e  => {
            switch(e.button) {
                case 0:
                    e.preventDefault();
                    this.mouse.push('LeftClick');
                    break;
                default:
                    break;
            }
        });
        
        canvas.addEventListener('contextmenu', e => {
            e.preventDefault();
        });            

        canvas.addEventListener('mouseup', e  => {
            switch(e.button) {
                case 0:
                    e.preventDefault();
                    this.mouse.splice(this.mouse.indexOf('LeftClick'), 1);
                default:
                    break;
            }
        });
    }

    reset(){
        this.mouse = [];
    }
}