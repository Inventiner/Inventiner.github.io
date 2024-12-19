export class login{
    constructor(){
        this.result;
        document.getElementById("logout").addEventListener("click", function(e) {
            e.preventDefault();
            sessionStorage.clear();
            window.location.reload();
        });

        document.getElementById("login-bar").addEventListener("submit", function(e) {
            e.preventDefault();
            fetch("https://ets-pemrograman-web-f.cyclic.app/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": document.querySelector('input[name="emaillogin"]').value,
                    "password": document.querySelector('input[name="passwordlogin"]').value
                }),
                redirect: 'follow',
            }) .then(response => response.text())
            .then(result => {
                this.result = JSON.parse(result)
                if(this.result.status == "success") {
                    sessionStorage.setItem("token", this.result.data.access_token);
                    console.log(sessionStorage.getItem("token"));
                    window.location.reload();
                }
                else{
                    window.alert(this.result.error);
                }
                
            })
            .catch(error => console.log('error', error));
        });
    }
}