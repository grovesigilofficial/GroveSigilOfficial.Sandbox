console.log("complete-profile.js loaded");


const usernameInput =
document.getElementById("username");


const finishButton =
document.getElementById("finish");


const message =
document.getElementById("message");



async function checkSession(){


    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error || !data.session){


        window.location.href =
        "login.html";


        return;


    }


}



finishButton.addEventListener("click", async ()=>{


    let username =
    usernameInput.value.trim();



    username =
    username.replace(/\s+/g, "_");



    if(!username){


        message.textContent =
        "Please choose a username.";


        return;


    }



    if(username.length < 3){


        message.textContent =
        "Username must be at least 3 characters.";


        return;


    }



    if(username.length > 20){


        message.textContent =
        "Username must be under 20 characters.";


        return;


    }



    message.textContent =
    "Checking username...";



    const { data: existingUser, error: usernameError } =
    await window.groveClient
    .from("profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle();



    if(usernameError){


        console.error(
            "Username check error:",
            usernameError
        );


        message.textContent =
        usernameError.message;


        return;


    }



    if(existingUser){


        message.textContent =
        "Username already taken.";


        return;


    }



    const { data: sessionData, error: sessionError } =
    await window.groveClient.auth.getSession();



    if(sessionError || !sessionData.session){


        window.location.href =
        "login.html";


        return;


    }



    const user =
    sessionData.session.user;



    message.textContent =
    "Creating profile...";



    const { error } =
    await window.groveClient
    .from("profiles")
    .insert({


        user_id: user.id,

        username: username


    });



    if(error){


        console.error(
            "Profile creation error:",
            error
        );


        message.textContent =
        error.message;


        return;


    }



    message.textContent =
    "Profile created. Entering Grove...";



    setTimeout(()=>{


        window.location.href =
        "user-dashboard.html";


    },1000);



});



checkSession();
