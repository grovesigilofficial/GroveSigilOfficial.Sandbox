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


        const card =
        document.createElement("div");


        card.className="card";


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


        <button onclick="updateApplication('${app.id}','approved')">
        Approve
        </button>


        <button onclick="updateApplication('${app.id}','rejected')">
        Reject
        </button>


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




loadApplications();
