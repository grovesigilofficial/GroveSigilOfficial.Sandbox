console.log("signup.js loaded");


const signupButton = document.getElementById("signup");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");


signupButton.addEventListener("click", async () => {

    console.log("Signup clicked");


    const email = emailInput.value.trim();
    const password = passwordInput.value;


    if (!email || !password) {

        message.textContent = "Enter email and password.";
        return;

    }


    message.textContent = "Creating account...";


    try {

        console.log("Supabase client:", supabase);


        const response = await supabase.auth.signUp({

            email: email,

            password: password

        });


        console.log("Supabase response:", response);


        const { data, error } = response;


        if(error){

            console.error("Signup error:", error);

            message.textContent = error.message;

            return;

        }


        message.textContent =
        "✓ Account created. Check your email to confirm your account.";


    } 
    
    catch(err){

        console.error("CRASH:", err);

        message.textContent = "Error: " + err.message;

    }


});
