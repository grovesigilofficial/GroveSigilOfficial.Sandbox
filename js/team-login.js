console.log("team-login loaded");


const email =
document.getElementById("email");

const password =
document.getElementById("password");

const login =
document.getElementById("login");

const message =
document.getElementById("message");



login.addEventListener("click", async ()=>{


    const { data, error } =
    await window.groveClient.auth.signInWithPassword({

        email: email.value,

        password: password.value

    });



    if(error){

        message.textContent = error.message;
        message.style.color="#ff5555";

        return;

    }



    const user = data.user;



    const { data: member, error: memberError } =
    await window.groveClient
    .from("team_members")
    .select("*")
    .eq("email", user.email)
    .single();



    if(memberError){

        message.textContent =
        "You are not approved for Grove Team access.";

        message.style.color="#ff5555";

        await window.groveClient.auth.signOut();

        return;

    }



    message.textContent =
    "Welcome to Grove.";

    message.style.color="#2f6e4a";



    if(member.role === "beta_tester"){

        window.location.href="beta-dashboard.html";

    }


    else if(member.role === "moderator"){

        window.location.href="moderator-dashboard.html";

    }


    else{

        window.location.href="team-dashboard.html";

    }



});
