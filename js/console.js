console.log("console.js loaded");


const logoutButton =
document.getElementById("logout");

const addTaskButton =
document.getElementById("add-task");

const taskTitle =
document.getElementById("task-title");

const taskDescription =
document.getElementById("task-description");

const tasksContainer =
document.getElementById("tasks");





async function checkAuth(){


    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error){

        console.error(
            "Auth error:",
            error
        );

        return;

    }



    if(!data.session){

        window.location.href =
        "console-login.html";

        return;

    }



    console.log(
        "Authenticated:",
        data.session.user.email
    );


    loadTasks();


}







async function loadTasks(){


    const { data, error } =
    await window.groveClient
    .from("tasks")
    .select("*")
    .order(
        "created_at",
        {
            ascending:false
        }
    );



    if(error){

        console.error(
            "Task loading error:",
            error
        );


        tasksContainer.innerHTML =
        "<p>Unable to load tasks.</p>";

        return;

    }




    if(!data.length){

        tasksContainer.innerHTML =
        "<p>No tasks yet.</p>";

        return;

    }



    tasksContainer.innerHTML = "";



    data.forEach(task=>{


        const div =
        document.createElement("div");


        div.className =
        "task";



        if(task.completed){

            div.classList.add(
                "completed"
            );

        }



        div.innerHTML = `

        <h3>
        ${task.completed ? "✓" : "☐"}
        ${task.title}
        </h3>


        <p>
        ${task.description || ""}
        </p>


        <div class="task-buttons">


        <button onclick="toggleTask('${task.id}', ${task.completed})">

        ${task.completed ? "Undo" : "Complete"}

        </button>



        <button onclick="editTask('${task.id}', '${task.title.replace(/'/g,"\\'")}')">

        Edit

        </button>



        <button onclick="deleteTask('${task.id}')">

        Delete

        </button>


        </div>

        `;



        tasksContainer.appendChild(div);



    });



}







async function addTask(){


    const title =
    taskTitle.value.trim();


    const description =
    taskDescription.value.trim();



    if(!title){

        alert(
            "Enter a task title first."
        );

        return;

    }



    const { error } =
    await window.groveClient
    .from("tasks")
    .insert({

        title:title,

        description:description

    });



    if(error){

        console.error(
            "Add task error:",
            error
        );

        alert(
            error.message
        );

        return;

    }



    taskTitle.value = "";

    taskDescription.value = "";


    loadTasks();


}







async function toggleTask(id, completed){


    const { error } =
    await window.groveClient
    .from("tasks")
    .update({

        completed:
        !completed,

        updated_at:
        new Date()

    })
    .eq(
        "id",
        id
    );



    if(error){

        console.error(
            error
        );

        return;

    }



    loadTasks();


}







async function editTask(id, oldTitle){


    const newTitle =
    prompt(
        "Edit task title:",
        oldTitle
    );



    if(!newTitle){

        return;

    }



    const { error } =
    await window.groveClient
    .from("tasks")
    .update({

        title:newTitle,

        updated_at:
        new Date()

    })
    .eq(
        "id",
        id
    );



    if(error){

        console.error(
            error
        );

        return;

    }



    loadTasks();


}







async function deleteTask(id){


    const confirmed =
    confirm(
        "Delete this task?"
    );



    if(!confirmed){

        return;

    }



    const { error } =
    await window.groveClient
    .from("tasks")
    .delete()
    .eq(
        "id",
        id
    );



    if(error){

        console.error(
            error
        );

        return;

    }



    loadTasks();


}







if(logoutButton){


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
    "console-login.html";


});


}







if(addTaskButton){


addTaskButton.addEventListener(
"click",
addTask
);


}






window.toggleTask =
toggleTask;


window.editTask =
editTask;


window.deleteTask =
deleteTask;






checkAuth();
