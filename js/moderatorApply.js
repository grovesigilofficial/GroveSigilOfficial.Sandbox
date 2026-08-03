const email = document.getElementById("email");
const username = document.getElementById("username");
const role = document.getElementById("role");
const reason = document.getElementById("reason");
const submit = document.getElementById("submit");


submit.addEventListener("click", async () => {


    submit.disabled = true;

    submit.textContent = "Submitting...";


    const { data, error } = await supabase
        .from("moderator_applications")
        .insert([

            {
                email: email.value,
                username: username.value,
                role: role.value,
                reason: reason.value
            }

        ]);



    if(error){

        alert(error.message);

        submit.disabled = false;

        submit.textContent = "Submit Application";

        return;

    }



    alert("Application submitted successfully. Thank you for helping Grove grow.");

    window.location.href = "index.html";


});
