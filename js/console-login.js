console.log("console-login.js loaded");


const form = document.querySelector("#loginForm");


form.addEventListener("submit", async function (event) {


    event.preventDefault();



    const email = document.querySelector("#email").value.trim();

    const password = document.querySelector("#password").value;



    try {


        console.log("Grove Client:", window.groveClient);



        const { data, error } =
        await window.groveClient.auth.signInWithPassword({

            email,
            password

        });



        if(error){

            alert(error.message);

            return;

        }



        const user = data.user;



        if(!user.email_confirmed_at){

            alert("Please confirm your email before logging in.");


            await window.groveClient.auth.signOut();


            return;

        }



        alert("Login successful.");


        window.location.href = "./console.html";



    }


    catch(err){


        console.error("Console login error:", err);


        alert(err.message);


    }


});
