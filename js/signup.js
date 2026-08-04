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



signupButton.addEventListener("click", async () => {


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



    try {


        const { data, error } =
        await window.groveClient.auth.signUp({


            email: email,


            password: password


        });



        if(error){


            console.error("Supabase signup error:", error);


            message.textContent =
            error.message;


            return;


        }



        if(data.user){



            const { error: profileError } =
            await window.groveClient
            .from("profiles")
            .insert({


                user_id: data.user.id,

                username: username


            });



            if(profileError){


                console.error(
                    "Profile creation error:",
                    profileError
                );


                message.textContent =
                profileError.message;


                return;


            }



            message.textContent =
            "✓ Account created. Check your email to confirm your account before logging in.";



            emailInput.value = "";

            usernameInput.value = "";

            passwordInput.value = "";


        }



    } catch(error){


        console.error(
            "Signup failed:",
            error
        );


        message.textContent =
        "Signup failed: " + error.message;


    }



});
