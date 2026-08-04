console.log("complete-profile.js loaded");


const usernameInput =
document.getElementById("username");


const finishButton =
document.getElementById("finish");


const message =
document.getElementById("message");



let currentUser = null;




async function checkSession(){


    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error || !data.session){


        window.location.href =
        "login.html";


        return false;


    }



    currentUser =
    data.session.user;



    const { data: profile, error: profileError } =
    await window.groveClient
    .from("profiles")
    .select("id")
    .eq("user_id", currentUser.id)
    .maybeSingle();



    if(profileError){


        console.error(
            "Profile check error:",
            profileError
        );


        return false;


    }



    if(profile){


        window.location.href =
        "user-dashboard.html";


        return false;


    }



    return true;


}





finishButton.addEventListener("click", async ()=>{


    if(!currentUser){


        const allowed =
        await checkSession();


        if(!allowed){

            return;

        }


    }




    let username =
    usernameInput.value.trim();



    username =
    username.replace(/\s+/g,"_");



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
    .select("id")
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





    message.textContent =
    "Creating profile...";





    const { error } =
    await window.groveClient
    .from("profiles")
    .insert({


        user_id: currentUser.id,

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
