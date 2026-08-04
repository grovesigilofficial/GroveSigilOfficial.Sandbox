console.log("moderatorConsole loaded");

const applications =
document.getElementById("applications");


async function loadApplications(){

    applications.innerHTML =
    "Loading applications...";

    const { data, error } =
    await window.groveClient
    .from("moderator_applications")
    .select("*")
    .order("created_at",{ascending:false});


    if(error){

        console.error("Load error:", error);

        applications.innerHTML =
        "Error: " + error.message;

        return;

    }


    if(!data || data.length === 0){

        applications.innerHTML =
        "No applications found.";

        return;

    }


    applications.innerHTML = "";


    data.forEach(app=>{


        const card =
        document.createElement("div");


        card.className =
        "card";


        let buttons = "";


        if(app.status === "pending"){

            buttons = `

            <button onclick="updateApplication('${app.id}','approved')">
            Approve
            </button>

            <button onclick="updateApplication('${app.id}','rejected')">
            Reject
            </button>

            `;

        }


        if(app.status === "approved"){

            buttons = `

            <button onclick="addToTeam('${app.id}')">
            Add To Grove Team
            </button>

            `;

        }


        card.innerHTML = `

        <p><b>Email:</b> ${app.email}</p>

        <p><b>Username:</b> ${app.username}</p>

        <p><b>Role:</b> ${app.role}</p>

        <p><b>Reason:</b> ${app.reason}</p>

        <p><b>Status:</b> ${app.status}</p>

        ${buttons}

        `;


        applications.appendChild(card);


    });


}




async function updateApplication(id,status){

    const { error } =
    await window.groveClient
    .from("moderator_applications")
    .update({
        status:status
    })
    .eq("id",id);


    if(error){

        alert(error.message);

        return;

    }


    loadApplications();

}




async function addToTeam(id){

    const { data: application, error } =
    await window.groveClient
    .from("moderator_applications")
    .select("*")
    .eq("id",id)
    .single();


    if(error){

        alert(error.message);

        return;

    }


    const { error: insertError } =
    await window.groveClient
    .from("team_members")
    .insert({

        user_id: application.user_id,

        email: application.email,

        username: application.username,

        role: application.role

    });


    if(insertError){

        alert(insertError.message);

        return;

    }


    alert("Added to Grove Team.");

}


loadApplications();
