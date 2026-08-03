console.log("console.js loaded");


const logoutButton = document.getElementById("logout");


async function checkAuth(){


    const { data, error } = await window.groveClient.auth.getSession();


    if(error){

        console.error("Auth error:", error);

        return;

    }



    if(!data.session){

        window.location.href = "console-login.html";

        return;

    }



    console.log(
        "Authenticated:",
        data.session.user.email
    );


}



logoutButton.addEventListener("click", async function(){


    console.log("Logout clicked");


    const { error } = await window.groveClient.auth.signOut();



    if(error){

        console.error("Logout error:", error);

        alert(error.message);

        return;

    }



    window.location.href = "console-login.html";


});



checkAuth();
