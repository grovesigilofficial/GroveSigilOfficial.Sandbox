console.log("signup.js loaded");


const signupButton = document.getElementById("signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");


signupButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;


    message.textContent = "";


    if (!email || !password) {

        message.textContent = "Please enter an email and password.";
        return;

    }


    const { data, error } = await supabase.auth.signUp({

        email: email,
        password: password

    });


    if (error) {

        console.error(error);

        message.textContent = error.message;

        return;

    }


    if (data.user) {

        message.textContent =
        "✓ Account created. Please check your email and confirm your account before logging in.";

        emailInput.value = "";
        passwordInput.value = "";

    }


});
