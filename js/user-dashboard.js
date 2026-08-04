console.log("user-dashboard loaded");


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



    emailDisplay.textContent =
    "Signed in as: " + data.session.user.email;


}



logoutButton.addEventListener("click", async ()=>{


    await window.groveClient.auth.signOut();


    window.location.href =
    "login.html";


});



checkUser();
