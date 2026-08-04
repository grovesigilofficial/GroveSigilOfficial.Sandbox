console.log("moderatorConsole loaded");


const applications =
document.getElementById("applications");



async function loadApplications(){


    applications.innerHTML =
    "Loading applications...";


    if(!window.groveClient){


        console.error(
            "groveClient missing"
        );


        applications.innerHTML =
        "Supabase client not loaded.";


        return;


    }



    const { data, error } =
    await window.groveClient
    .from("moderator_applications")
    .select("*")
    .order(
        "created_at",
        {
            ascending:false
        }
    );



    console.log(
        "Applications:",
        data
    );


    console.log(
        "Application error:",
        error
    );



    if(error){


        console.error(
            "Load error:",
            error
        );


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


        <p>
        <b>Email:</b> ${app.email}
        </p>


        <p>
        <b>Username:</b> ${app.username}
        </p>


        <p>
        <b>Role:</b> ${app.role}
        </p>


        <p>
        <b>Reason:</b> ${app.reason}
        </p>


        <p class="status">

        Status: ${app.status}

        </p>


        <br>


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
    .eq(
        "id",
        id
    );



    if(error){


        console.error(
            "Update error:",
            error
        );


        alert(
            error.message
        );


        return;


    }



    loadApplications();



}







async function addToTeam(id){



    const { data: application, error } =
    await window.groveClient
    .from("moderator_applications")
    .select("*")
    .eq(
        "id",
        id
    )
    .single();



    if(error){


        console.error(
            "Application error:",
            error
        );


        alert(
            error.message
        );


        return;


    }



    const { error: teamError } =
    await window.groveClient
    .from("team_members")
    .insert({

        email:
        application.email,

        username:
        application.username,

        role:
        application.role

    });



    if(teamError){


        console.error(
            "Team insert error:",
            teamError
        );


        alert(
            teamError.message
        );


        return;


    }



    alert(
        "Added to Grove Team"
    );


    loadApplications();



}







window.updateApplication =
updateApplication;


window.addToTeam =
addToTeam;





loadApplications();
