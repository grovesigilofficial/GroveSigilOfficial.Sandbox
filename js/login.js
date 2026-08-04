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

        message.style.color = "#ff5555";

        return;

    }



    message.textContent =
    "Logging in...";

    message.style.color = "#8f9893";



    try {


        const { data, error } =
        await window.groveClient.auth.signInWithPassword({

            email,

            password

        });



        if(error){

            console.error("Login error:", error);

            message.textContent =
            error.message;

            message.style.color = "#ff5555";

            return;

        }



        if(data.user){


            message.textContent =
            "Login successful.";

            message.style.color = "#2f6e4a";



            setTimeout(()=>{


                window.location.href =
                "user-dashboard.html";


            },800);



        }



    } catch(err){


        console.error("Login failed:", err);


        message.textContent =
        err.message;

        message.style.color =
        "#ff5555";


    }



});
