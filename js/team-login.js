console.log("team-login loaded");


const emailInput =
document.getElementById("email");


const passwordInput =
document.getElementById("password");


const loginButton =
document.getElementById("login");


const message =
document.getElementById("message");



loginButton.addEventListener("click", async ()=>{


    const email =
    emailInput.value.trim();


    const password =
    passwordInput.value;



    if(!email || !password){

        message.textContent =
        "Enter email and password.";

        message.style.color="#ff5555";

        return;

    }



    message.textContent =
    "Logging in...";



    const { data, error } =
    await window.groveClient.auth.signInWithPassword({

        email,
        password

    });



    if(error){

        console.error(error);

        message.textContent =
        error.message;

        message.style.color="#ff5555";

        return;

    }




    const user =
    data.user;



    const { data: member, error: memberError } =
    await window.groveClient
    .from("team_members")
    .select("*")
    .eq("user_id", user.id)
    .single();



    if(memberError || !member){


        console.error(
            "Not a team member:",
            memberError
        );


        await window.groveClient.auth.signOut();


        message.textContent =
        "You do not have Grove Team access.";

        message.style.color="#ff5555";


        return;


    }




    message.textContent =
    "Welcome to Grove.";

    message.style.color="#2f6e4a";



    setTimeout(()=>{


        window.location.href =
        "team-dashboard.html";


    },800);



});
