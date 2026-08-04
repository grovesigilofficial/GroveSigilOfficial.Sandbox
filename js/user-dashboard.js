console.log("user-dashboard loaded");


const usernameDisplay =
document.getElementById("username");


const emailDisplay =
document.getElementById("user-email");


const logoutButton =
document.getElementById("logout");


const postContent =
document.getElementById("post-content");


const createPostButton =
document.getElementById("create-post");


const postMessage =
document.getElementById("post-message");


const feed =
document.getElementById("feed");



let currentUser = null;





async function checkUser(){


    const { data, error } =
    await window.groveClient.auth.getSession();



    if(error || !data.session){


        window.location.href =
        "login.html";


        return;


    }



    currentUser =
    data.session.user;



    emailDisplay.textContent =
    "Email: " + currentUser.email;



    const { data: profile, error: profileError } =
    await window.groveClient
    .from("profiles")
    .select("username")
    .eq("user_id", currentUser.id)
    .single();



    if(profileError){


        console.error(
            "Profile loading error:",
            profileError
        );


        usernameDisplay.textContent =
        "Welcome to Grove";


    } else {


        usernameDisplay.textContent =
        "Welcome, " + profile.username;


    }



    loadPosts();


}






async function createPost(){


    const content =
    postContent.value.trim();



    if(!content){


        postMessage.textContent =
        "Write something first.";


        return;


    }



    postMessage.textContent =
    "Posting...";



    const { error } =
    await window.groveClient
    .from("posts")
    .insert({

        user_id: currentUser.id,

        content: content

    });



    if(error){


        console.error(
            "Post error:",
            error
        );


        postMessage.textContent =
        error.message;


        return;


    }



    postContent.value = "";


    postMessage.textContent =
    "Posted to Grove.";



    loadPosts();



}







async function loadPosts(){


    const { data: posts, error } =
    await window.groveClient
    .from("posts")
    .select(`
        id,
        user_id,
        content,
        created_at
    `)
    .order(
        "created_at",
        {
            ascending:false
        }
    );



    if(error){


        console.error(
            "Feed error:",
            error
        );


        feed.innerHTML =
        "<p>Unable to load feed.</p>";


        return;


    }



    if(!posts.length){


        feed.innerHTML =
        "<p>No posts yet. Be the first in Grove.</p>";


        return;


    }



    feed.innerHTML = "";



    for(const post of posts){


        const { data: profile } =
        await window.groveClient
        .from("profiles")
        .select("username")
        .eq("user_id", post.user_id)
        .maybeSingle();



        const username =
        profile?.username || "Unknown";



        const div =
        document.createElement("div");



        div.className =
        "post";



        div.innerHTML = `

            <p>
                <strong>
                    ${username}
                </strong>
            </p>


            <p>
                ${post.content}
            </p>


            <p class="post-time">
                ${new Date(post.created_at).toLocaleString()}
            </p>

        `;



        feed.appendChild(div);



    }



}







createPostButton.addEventListener(
    "click",
    createPost
);





logoutButton.addEventListener("click", async ()=>{


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
    "index.html";


});





checkUser();
