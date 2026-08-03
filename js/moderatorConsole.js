console.log("moderatorConsole.js loaded");


const applications = document.getElementById("applications");


async function loadApplications(){


    console.log("Loading moderator applications...");


    if(!window.groveClient){

        applications.innerHTML = `
        <p class="error">
        Supabase client not loaded.
        </p>
        `;

        return;

    }



    const { data, error } =
    await window.groveClient
        .from("moderator_applications")
        .select("*")
        .order("created_at", { ascending:false });



    console.log("Applications data:", data);

    console.log("Applications error:", error);



    if(error){


        applications.innerHTML = `

        <p class="error">
        ${error.message}
        </p>

        `;

        return;

    }



    if(!data || data.length === 0){


        applications.innerHTML = `

        <p class="loading">
        No applications found.
        </p>

        `;

        return;

    }



    applications.innerHTML = "";



    data.forEach(app => {



        const card = document.createElement("div");


        card.className = "card";



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
