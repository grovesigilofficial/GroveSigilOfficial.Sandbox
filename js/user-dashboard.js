console.log("user-dashboard loaded");


const usernameDisplay =
document.getElementById("username");


const emailDisplay =
document.getElementById("user-email");


const logoutButton =
document.getElementById("logout");



async function checkUser(){


    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error || !data.session){


        window.location.href =
        "login.html";


        return;


    }



    const user =
    data.session.user;



    emailDisplay.textContent =
    "Email: " + user.email;



    const { data: profile, error: profileError } =
    await window.groveClient
    .from("profiles")
    .select("username")
    .eq("user_id", user.id)
    .single();



    if(profileError){


        console.error(
            "Profile loading error:",
            profileError
        );


        usernameDisplay.textContent =
        "Welcome to Grove";


        return;


    }



    usernameDisplay.textContent =
    "Welcome, " + profile.username;



}




logoutButton.addEventListener("click", async ()=>{


    const { error } =
    await window.groveClient.auth.signOut();



    if(error){


        console.error(
            "Logout error:",
            error
        );


        return;


    }



    window.location.href =
    "index.html";


});




checkUser();
