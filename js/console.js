const logoutButton = document.getElementById("logout");


async function checkAuth(){

    const { data } = await window.grove.auth.getSession();


    if(!data.session){

        window.location.href = "console-login.html";

        return;

    }


    console.log("Authenticated:", data.session.user.email);

}



logoutButton.addEventListener("click", async ()=>{


    await window.grove.auth.signOut();


    window.location.href = "console-login.html";


});



checkAuth();
