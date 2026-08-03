console.log("signup.js loaded");


const signupButton = document.getElementById("signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");


signupButton.addEventListener("click", async () => {

    console.log("Signup button clicked");


    const email = emailInput.value.trim();
    const password = passwordInput.value;


    if (!email || !password) {

        message.textContent = "Please enter an email and password.";
        return;

    }


    message.textContent = "Creating account...";


    try {


        const result = await supabase.auth.signUp({

            email: email,

            password: password

        });


        console.log(result);


        const { data, error } = result;


        if(error){

            console.error(error);

            message.textContent = error.message;

            return;

        }


        message.textContent =
        "✓ Account created. Check your email to confirm your account.";


        emailInput.value = "";
        passwordInput.value = "";


    }

    catch(error){

        console.error(error);

        message.textContent =
        "Signup failed. Check console.";

    }


});
