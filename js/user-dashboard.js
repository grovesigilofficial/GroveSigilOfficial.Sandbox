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


const suggestionContent =
document.getElementById("suggestion-content");


const sendSuggestionButton =
document.getElementById("send-suggestion");


const suggestionMessage =
document.getElementById("suggestion-message");


let currentUser = null;


let currentRole = "user";






function getUserStatus(lastSeen){


    if(!lastSeen){

        return "● Offline";

    }



    const now =
    new Date();



    const last =
    new Date(lastSeen);



    const difference =
    now - last;



    const minutes =
    Math.floor(
        difference / 60000
    );



    if(minutes < 5){

        return "● Active";

    }



    if(minutes < 60){

        return `● Last seen ${minutes} minutes ago`;

    }



    const hours =
    Math.floor(
        minutes / 60
    );



    if(hours < 24){

        return `● Last seen ${hours} hour${hours === 1 ? "" : "s"} ago`;

    }



    const days =
    Math.floor(
        hours / 24
    );



    return `● Last seen ${days} day${days === 1 ? "" : "s"} ago`;


}






async function updateLastSeen(){


    if(!currentUser){

        return;

    }



    const { error } =
    await window.groveClient
    .from("profiles")
    .update({

        last_seen:new Date()

    })
    .eq(
        "user_id",
        currentUser.id
    );



    if(error){

        console.error(
            "Last seen update error:",
            error
        );

    }


}







async function deletePost(postId){


    const confirmed =
    confirm(
        "Delete this post?"
    );


    if(!confirmed){

        return;

    }



    const { error } =
    await window.groveClient
    .from("posts")
    .delete()
    .eq(
        "id",
        postId
    )
    .eq(
        "user_id",
        currentUser.id
    );



    if(error){

        console.error(
            "Delete post error:",
            error
        );

        alert(
            error.message
        );

        return;

    }



    loadPosts();


}







async function editPost(postId, oldContent){


    const newContent =
    prompt(
        "Edit your post:",
        oldContent
    );


    if(
        !newContent ||
        newContent.trim() === oldContent
    ){

        return;

    }



    const { error } =
    await window.groveClient
    .from("posts")
    .update({

        content:
        newContent.trim()

    })
    .eq(
        "id",
        postId
    )
    .eq(
        "user_id",
        currentUser.id
    );



    if(error){

        console.error(
            "Edit post error:",
            error
        );

        alert(
            error.message
        );

        return;

    }



    loadPosts();


}







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



    await updateLastSeen();



    currentRole =
    await getUserRole();



    console.log(
        "Current role:",
        currentRole
    );



    emailDisplay.textContent =
    "Email: " + currentUser.email;



    const { data: profile, error: profileError } =
    await window.groveClient
    .from("profiles")
    .select("username")
    .eq(
        "user_id",
        currentUser.id
    )
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

        user_id:
        currentUser.id,

        content:
        content

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
async function sendSuggestion(){


    const content =
    suggestionContent.value.trim();



    if(!content){


        suggestionMessage.textContent =
        "Write a suggestion first.";


        return;


    }



    suggestionMessage.textContent =
    "Sending...";





    const { error } =
    await window.groveClient
    .from("feedback")
    .insert({

        user_id:
        currentUser.id,

        content:
        content

    });





    if(error){


        console.error(
            "Suggestion error:",
            error
        );


        suggestionMessage.textContent =
        error.message;


        return;


    }





    suggestionContent.value = "";



    suggestionMessage.textContent =
    "Suggestion sent to Grove.";


}






async function loadPosts(){


    const { data, error } =
    await window.groveClient
    .from("posts")
    .select(`

        id,

        user_id,

        content,

        created_at,

        profiles(

            username,

            last_seen

        )

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





    if(!data.length){


        feed.innerHTML =
        "<p>No posts yet. Be the first in Grove.</p>";


        return;


    }





    feed.innerHTML = "";





    data.forEach(post=>{


        const div =
        document.createElement("div");



        div.className =
        "post";



        const username =
        post.profiles?.username ||
        "Unknown";



        const status =
        getUserStatus(
            post.profiles?.last_seen
        );



        let controls = "";



        if(
            currentUser &&
            post.user_id === currentUser.id
        ){

            controls = `

            <button onclick="editPost('${post.id}', ${JSON.stringify(post.content)})">

            Edit

            </button>


            <button onclick="deletePost('${post.id}')">

            Delete

            </button>

            `;

        }



        div.innerHTML = `

        <p>

        <strong>
        ${username}
        </strong>

        <span class="user-status">
        ${status}
        </span>

        </p>


        <p>
        ${post.content}
        </p>


        <div>

        ${controls}

        </div>


        <p class="post-time">

        ${new Date(post.created_at).toLocaleString()}

        </p>

        `;



        feed.appendChild(div);



    });


}







window.deletePost =
deletePost;


window.editPost =
editPost;








createPostButton.addEventListener(
"click",
createPost
);








if(sendSuggestionButton){


    sendSuggestionButton.addEventListener(
    "click",
    sendSuggestion
    );


}








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
    "index.html";


});








checkUser();
