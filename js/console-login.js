const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();

    const password = document.querySelector('input[type="password"]').value;

    try {

        const { data, error } = await window.grove.auth.signInWithPassword({

            email,
            password

        });

        if (error) {

            alert(error.message);
            return;

        }

        window.location.href = "console.html";

    }

    catch (err) {

        alert(err.message);
        console.error(err);

    }

});
