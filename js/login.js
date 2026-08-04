console.log("login.js loaded");


const loginButton =
document.getElementById("login");


const emailInput =
document.getElementById("email");


const passwordInput =
document.getElementById("password");


const message =
document.getElementById("message");



loginButton.addEventListener("click", async ()=>{


    const email =
    emailInput.value.trim();


    const password =
    passwordInput.value;



    if(!email || !password){

        message.textContent =
        "Please enter email and password.";

        return;

    }



    message.textContent =
    "Logging in...";



    const { data, error } =
    await window.groveClient.auth.signInWithPassword({

        email,

        password

    });



    if(error){

        message.textContent =
        error.message;

        return;

    }



    if(data.user){


        message.textContent =
        "Login successful.";


        window.location.href =
        "index.html";


    }


});
