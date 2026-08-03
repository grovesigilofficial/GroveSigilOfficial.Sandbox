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

        applications.innerHTML =
        error.message;

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

        `;


        applications.appendChild(card);


    });


}



loadApplications();
