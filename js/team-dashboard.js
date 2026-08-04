console.log("team-dashboard loaded");


const nameDisplay =
document.getElementById("team-name");


const emailDisplay =
document.getElementById("team-email");


const roleDisplay =
document.getElementById("team-role");


const logoutButton =
document.getElementById("logout");



async function updateLastSeen(userId){


    const { error } =
    await window.groveClient
    .from("team_members")
    .update({

        last_seen: new Date().toISOString()

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
    "Role: " + member.role;



    await updateLastSeen(user.id);




    setInterval(()=>{


        updateLastSeen(user.id);


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
