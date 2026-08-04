console.log("team-dashboard loaded");


const nameDisplay =
document.getElementById("team-name");


const emailDisplay =
document.getElementById("team-email");


const roleDisplay =
document.getElementById("team-role");


const onlineLight =
document.getElementById("online-light");


const onlineText =
document.getElementById("online-text");


const lastSeenDisplay =
document.getElementById("last-seen");


const logoutButton =
document.getElementById("logout");





function formatLastSeen(date){


    const now =
    new Date();


    const diff =
    Math.floor(
        (now - date) / 1000
    );


    if(diff < 60){

        return "Just now";

    }


    if(diff < 3600){

        return Math.floor(diff / 60) + " minutes ago";

    }


    if(diff < 86400){

        return Math.floor(diff / 3600) + " hours ago";

    }


    return date.toLocaleString();


}





function updateStatus(lastSeen){


    const seen =
    new Date(lastSeen);


    const seconds =
    (new Date() - seen) / 1000;



    if(seconds < 120){


        onlineLight.style.background =
        "#2f6e4a";


        onlineText.textContent =
        "Online";


    } else {


        onlineLight.style.background =
        "#555";


        onlineText.textContent =
        "Offline";


    }



    lastSeenDisplay.textContent =
    "Last seen: " + formatLastSeen(seen);


}







async function updateLastSeen(userId){


    const now =
    new Date().toISOString();



    const { error } =
    await window.groveClient
    .from("team_members")
    .update({

        last_seen: now

    })
    .eq(
        "user_id",
        userId
    );



    if(error){

        console.error(
            "Last seen update error:",
            error
        );

    }


    return now;


}






async function loadTeamMember(){


    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error || !data.session){


        window.location.href =
        "team-login.html";


        return;


    }



    const user =
    data.session.user;





    const { data: member, error: memberError } =
    await window.groveClient
    .from("team_members")
    .select("*")
    .eq(
        "user_id",
        user.id
    )
    .single();





    if(memberError || !member){


        console.error(
            "Team access error:",
            memberError
        );


        await window.groveClient.auth.signOut();


        window.location.href =
        "team-login.html";


        return;


    }







    nameDisplay.textContent =
    "Welcome, " + member.username;



    emailDisplay.textContent =
    "Email: " + member.email;



    roleDisplay.textContent =
    "Role: " + member.role.toUpperCase();




    await updateLastSeen(user.id);



    updateStatus(
        new Date()
    );



    setInterval(async ()=>{


        const updated =
        await updateLastSeen(user.id);



        updateStatus(
            updated
        );


    },60000);



}







logoutButton.addEventListener(
"click",
async ()=>{


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






loadTeamMember();
