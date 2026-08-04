console.log("permissions.js loaded");


async function getUserRole(){

    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error){

        console.error(
            "Permission auth error:",
            error
        );

        return "user";

    }



    if(!data.session){

        return "user";

    }



    const user =
    data.session.user;



    const { data: teamMember, error: teamError } =
    await window.groveClient
    .from("team_members")
    .select("role")
    .eq(
        "user_id",
        user.id
    )
    .single();



    if(teamError || !teamMember){

        return "user";

    }



    return teamMember.role || "user";


}





function hasPermission(
    role,
    requiredRole
){


    const hierarchy = {

        user:1,

        beta_tester:2,

        moderator:3,

        owner:4

    };



    return (
        hierarchy[role] >=
        hierarchy[requiredRole]
    );


}





window.getUserRole =
getUserRole;


window.hasPermission =
hasPermission;
