const form = document.querySelector("#signupForm");
const message = document.querySelector("#message");


form.addEventListener("submit", async (event)=>{

    event.preventDefault();


    const email = document.querySelector("#email").value.trim();

    const password = document.querySelector("#password").value;


    message.textContent = "Creating account...";


    const { data, error } = await window.grove.auth.signUp({

        email,

        password,

        options:{
            emailRedirectTo:
            window.location.origin + "/console-login.html"
        }

    });


    if(error){

        message.textContent = error.message;
        return;

    }


    console.log(data);


    message.textContent =
    "Account created. Check your email to confirm your account.";

});
