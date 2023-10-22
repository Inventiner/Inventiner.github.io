export class scoreboard{
    constructor() {
        fetch("https://ets-pemrograman-web-f.cyclic.app/scores/score", {
                method: 'GET',
            }) .then(response => response.text())
            .then(result => {
                this.result = JSON.parse(result)
                this.result.data.sort((a, b) => parseInt(b.score) - parseInt(a.score));
                // console.log(this.result.data)
                document.getElementById("nama1th").innerHTML    = this.result.data[0].nama
                document.getElementById("score1th").innerHTML   = this.result.data[0].score
                document.getElementById("id1th").innerHTML      = this.result.data[0].id
                document.getElementById("nama2th").innerHTML    = this.result.data[1].nama
                document.getElementById("score2th").innerHTML   = this.result.data[1].score
                document.getElementById("id2th").innerHTML      = this.result.data[1].id
                document.getElementById("nama3th").innerHTML    = this.result.data[2].nama
                document.getElementById("score3th").innerHTML   = this.result.data[2].score
                document.getElementById("id3th").innerHTML      = this.result.data[2].id
            })
    }
}