console.log("team-dashboard loaded");


const nameDisplay =
document.getElementById("team-name");


const emailDisplay =
document.getElementById("team-email");


const roleDisplay =
document.getElementById("team-role");


const logoutButton =
document.getElementById("logout");





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
        "email",
        user.email
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
