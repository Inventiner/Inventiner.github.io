export class timer{
    secstring = "";
    minstring = "";
    constructor(){
        this.time = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.updateS = document.getElementById('second');
        this.updateM = document.getElementById('minute');
    }

    tick() {
        this.time += 1;
        if(this.time >= 60)
        {
            this.time = 0;
            this.seconds += 1;
            if(this.seconds < 10) {
                this.secstring = "0" + this.seconds.toString();
            }
            else {
                this.secstring = this.seconds.toString();
            }

            this.updateS.innerHTML = this.secstring;
        }
        if(this.seconds >= 60)
        {
            this.seconds = 0;
            this.updateS.innerHtML = "00";
            this.minutes += 1;
            if(this.minutes < 10) {
                this.minstring = "0" + this.minutes.toString();
            }
            else {
                this.minstring = this.minutes.toString();
            }

            this.updateM.innerHTML = this.minstring;
        }
    }


}