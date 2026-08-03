console.log("signup.js loaded");


const signupButton = document.getElementById("signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");


signupButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    if (!email || !password) {

        message.textContent = "Please enter your email and password.";
        return;

    }


    message.textContent = "Creating account...";


    const { data, error } = await supabase.auth.signUp({

        email: email,

        password: password,

        options: {

            emailRedirectTo: window.location.origin + "/login.html"

        }

    });



    if (error) {

        console.error(error);

        message.textContent = error.message;

        return;

    }



    if (data.user) {

        message.textContent =
        "✓ Account created. Check your email to confirm your account before logging in.";

        emailInput.value = "";
        passwordInput.value = "";

    }


});
