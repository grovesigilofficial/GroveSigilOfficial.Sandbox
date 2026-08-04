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


    const username =
    usernameInput.value.trim();



    if(!username){


        message.textContent =
        "Please choose a username.";


        return;


    }



    message.textContent =
    "Creating profile...";



    const { data: sessionData, error: sessionError } =
    await window.groveClient.auth.getSession();



    if(sessionError || !sessionData.session){


        window.location.href =
        "login.html";


        return;


    }



    const user =
    sessionData.session.user;



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
