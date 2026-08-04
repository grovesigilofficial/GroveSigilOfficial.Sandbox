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


        message.style.color =
        "#ff5555";


        return;


    }



    message.textContent =
    "Logging in...";


    message.style.color =
    "#8f9893";




    const { data, error } =
    await window.groveClient.auth.signInWithPassword({

        email,

        password

    });




    if(error){


        console.error(
            "Login error:",
            error
        );


        message.textContent =
        error.message;


        message.style.color =
        "#ff5555";


        return;


    }




    const user =
    data.user;




    const { data: member, error: memberError } =
    await window.groveClient
    .from("team_members")
    .select("*")
    .eq(
        "email",
        user.email
    )
    .single();





    if(memberError || !member){


        console.error(
            "Team lookup error:",
            memberError
        );


        message.textContent =
        "You are not approved for Grove Team access.";


        message.style.color =
        "#ff5555";



        await window.groveClient.auth.signOut();


        return;


    }




    message.textContent =
    "Welcome to Grove Team.";


    message.style.color =
    "#2f6e4a";





    setTimeout(()=>{


        if(member.role === "moderator"){


            window.location.href =
            "moderator-dashboard.html";


        }



        else if(member.role === "beta_tester"){


            window.location.href =
            "beta-dashboard.html";


        }



        else{


            window.location.href =
            "team-dashboard.html";


        }



    },800);




});
