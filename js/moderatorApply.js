console.log("moderatorApply.js loaded");


const email = document.getElementById("email");
const username = document.getElementById("username");
const role = document.getElementById("role");
const reason = document.getElementById("reason");
const submit = document.getElementById("submit");
const message = document.getElementById("message");



submit.addEventListener("click", async () => {


    if(
        !email.value ||
        !username.value ||
        !role.value ||
        !reason.value
    ){

        message.textContent = "Please complete all fields.";
        message.style.color = "#ffb84d";

        return;

    }



    submit.disabled = true;

    submit.textContent = "Submitting...";



    try {


        console.log("Grove Client:", window.groveClient);



        const sessionCheck = await window.groveClient.auth.getSession();

        console.log("CURRENT SESSION:", sessionCheck);



        const { data, error } = await window.groveClient
            .from("moderator_applications")
            .insert([
                {
                    email: email.value,
                    username: username.value,
                    role: role.value,
                    reason: reason.value,
                    status: "pending"
                }
            ])
            .select();



        console.log("DATA:", data);

        console.log("ERROR:", error);



        if(error){


            message.textContent = error.message;

            message.style.color = "#ff5555";


            submit.disabled = false;

            submit.textContent = "Submit Application";


            return;

        }



        message.textContent = "Application submitted successfully!";

        message.style.color = "#2f6e4a";



        setTimeout(() => {

            window.location.href = "index.html";

        },2000);



    } catch(err){


        console.error("Application error:", err);


        message.textContent = err.message;

        message.style.color = "#ff5555";


        submit.disabled = false;

        submit.textContent = "Submit Application";


    }


});
