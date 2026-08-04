console.log("signup.js loaded");


const signupButton =
document.getElementById("signup");


const emailInput =
document.getElementById("email");


const usernameInput =
document.getElementById("username");


const passwordInput =
document.getElementById("password");


const message =
document.getElementById("message");



signupButton.addEventListener("click", async ()=>{


    const email =
    emailInput.value.trim();


    const username =
    usernameInput.value.trim();


    const password =
    passwordInput.value;



    if(!email || !username || !password){


        message.textContent =
        "Please enter email, username, and password.";


        return;


    }



    message.textContent =
    "Creating account...";



    const { data, error } =
    await window.groveClient.auth.signUp({


        email,

        password


    });



    if(error){


        console.error(
            "Signup error:",
            error
        );


        message.textContent =
        error.message;


        return;


    }



    if(data.user){


        message.textContent =
        "✓ Account created. Check your email to confirm your account.";


        emailInput.value = "";

        usernameInput.value = "";

        passwordInput.value = "";


    }



});
