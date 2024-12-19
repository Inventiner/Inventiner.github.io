export class register {
    constructor(){
        this.register = document.getElementById("registerpage");
        this.cancel = document.getElementById("cancelbtn");
        document.getElementById("register").addEventListener("click", function(e) {
            e.preventDefault();
            this.form = document.getElementById("registerpage");
            this.form.style.visibility = "visible";
        });

        this.cancel.addEventListener("click", function(e) {
            e.preventDefault();
            this.form.style.visibility = "hidden";
        }); 

        this.register.addEventListener("submit", function(e) {
            e.preventDefault();

            if(document.querySelector('input[name="password"]').value != document.querySelector('input[name="psw-repeat"]').value) {
                window.alert("Repeat Password berbeda dengan password!")
            }
            else{
                fetch("https://ets-pemrograman-web-f.cyclic.app/users/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "nama": document.querySelector('input[name="nama"]').value,
                        "email": document.querySelector('input[name="email"]').value,
                        "password": document.querySelector('input[name="password"]').value
                    }),
                    redirect: 'follow',
                }) .then(response => response.text())
                .then(result => {
                    this.result = JSON.parse(result);
                    if(this.result.status == "success") {
                        window.alert("Sign Up Berhasil, silahkan login!")
                        window.location.reload();
                    }
                    else{
                        window.alert(this.result.error);
                    }
                })
                .catch(error => console.log('error', error));
            }
        });
    }
}
