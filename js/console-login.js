const form = document.querySelector("#loginForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;


    try {

        const { data, error } = await window.grove.auth.signInWithPassword({

            email,
            password

        });


        if (error) {

            alert(error.message);
            return;

        }


        console.log("Login successful:", data.user);


        // Use absolute path from site root
        window.location.assign("/console.html");


    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

});
