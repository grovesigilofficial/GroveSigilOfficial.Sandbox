console.log("signup.js loaded");

const signupButton = document.getElementById("signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");


if (!signupButton) {
    console.error("Signup button not found");
}

if (!message) {
    console.error("Message box not found");
}


signupButton.addEventListener("click", async () => {

    console.log("Create Account clicked");


    const email = emailInput.value.trim();
    const password = passwordInput.value;


    message.textContent = "";


    if (!email || !password) {

        message.textContent = "Please enter an email and password.";
        return;

    }


    if (!window.supabase) {

        message.textContent = "Supabase failed to load.";
        console.error("Supabase library missing");
        return;

    }


    try {

        const { data, error } = await supabase.auth.signUp({

            email: email,

            password: password

        });


        if (error) {

            console.error(error);


            if (error.message.toLowerCase().includes("password")) {

                message.textContent = "Password does not meet requirements.";

            } 
            else if (error.message.toLowerCase().includes("email")) {

                message.textContent = "Please enter a valid email address.";

            } 
            else {

                message.textContent = error.message;

            }

            return;

        }


        if (data.user) {

            message.textContent = "✓ Account created. Check your email to verify your account.";

            emailInput.value = "";
            passwordInput.value = "";

        }


    } catch (err) {

        console.error(err);

        message.textContent = "Something went wrong. Try again.";

    }


});
