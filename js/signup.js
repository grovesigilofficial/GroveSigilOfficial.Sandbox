console.log("signup.js loaded");


const signupButton = document.getElementById("signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");


signupButton.addEventListener("click", async () => {


    const email = emailInput.value.trim();
    const password = passwordInput.value;


    if(!email || !password){

        message.textContent = "Please enter email and password.";
        return;

    }


    message.textContent = "Creating account...";


    try {


        const { data, error } = await window.groveClient.auth.signUp({

            email: email,

            password: password

        });



        if(error){

            console.error("Supabase error:", error);

            message.textContent = error.message;

            return;

        }



        if(data.user){

            message.textContent =
            "✓ Account created. Check your email to confirm your account before logging in.";

            emailInput.value = "";
            passwordInput.value = "";

        }


    } catch(error){


        console.error("Signup failed:", error);

        message.textContent =
        "Signup failed: " + error.message;


    }


});
