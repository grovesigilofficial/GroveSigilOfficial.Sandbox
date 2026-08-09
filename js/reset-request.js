console.log("reset-request.js loaded");

const resetForm =
document.getElementById("resetForm");

const emailInput =
document.getElementById("email");

const resetButton =
document.getElementById("resetButton");

const message =
document.getElementById("message");

resetForm.addEventListener(
"submit",
async function(event){

```
    event.preventDefault();


    const email =
    emailInput.value.trim();


    if(!email){

        message.textContent =
        "Enter your email address.";

        return;

    }


    resetButton.disabled = true;


    resetButton.textContent =
    "Sending...";


    message.textContent = "";


    try{

        const { error } =
        await window.groveClient.auth.resetPasswordForEmail(
            email,
            {
                redirectTo:
                "https://grove-sigil-official-sandbox.vercel.app/reset-password.html"
            }
        );


        if(error){

            console.error(
                "Password reset error:",
                error
            );


            message.textContent =
            error.message;


            resetButton.disabled =
            false;


            resetButton.textContent =
            "Send Reset Link";


            return;

        }


        message.textContent =
        "If an account exists for that email, a password reset link has been sent.";


        emailInput.value = "";


        resetButton.textContent =
        "Reset Link Sent";


    }


    catch(error){

        console.error(
            "Password reset exception:",
            error
        );


        message.textContent =
        "Unable to send the reset link. Please try again.";


        resetButton.disabled =
        false;


        resetButton.textContent =
        "Send Reset Link";

    }

}
```

);
