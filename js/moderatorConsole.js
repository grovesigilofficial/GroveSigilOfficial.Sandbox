console.log("moderatorConsole loaded");


const applications =
document.getElementById("applications");



async function loadApplications(){


    const { data, error } =
    await window.groveClient
    .from("moderator_applications")
    .select("*")
    .order("created_at",{ascending:false});



    if(error){

        applications.innerHTML = error.message;

        return;

    }



    if(!data.length){

        applications.innerHTML = "No applications found.";

        return;

    }



    applications.innerHTML = "";



    data.forEach(app => {


        const card = document.createElement("div");


        card.className = "card";



        let actionButtons = "";



        if(app.status === "pending"){


            actionButtons = `

            <button onclick="updateApplication('${app.id}','approved')">
            Approve
            </button>


            <button onclick="updateApplication('${app.id}','rejected')">
            Reject
            </button>

            `;


        }



        if(app.status === "approved"){


            actionButtons = `

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


        ${actionButtons}


        `;



        applications.appendChild(card);


    });


}





async function updateApplication(id,status){


    const { error } =
    await window.groveClient
    .from("moderator_applications")
    .update({

        status: status

    })
    .eq("id",id);



    if(error){

        alert(error.message);

        return;

    }



    alert(
        "Application updated: " + status
    );


    loadApplications();


}






async function addToTeam(id){


    const { data: application, error } =
    await window.groveClient
    .from("moderator_applications")
    .select("*")
    .eq("id", id)
    .single();



    if(error){

        alert(error.message);

        return;

    }




    const { error: insertError } =
    await window.groveClient
    .from("team_members")
    .insert([

        {

            email: application.email,

            username: application.username,

            role: application.role

        }

    ]);



    if(insertError){

        alert(insertError.message);

        return;

    }



    alert(
        application.username + " added to Grove Team!"
    );


}





loadApplications();
