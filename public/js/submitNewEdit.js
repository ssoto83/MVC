let Post = window.location.pathname.split("/");

// Allows user to edit blog posts from the Post page
const submitEdit = async (event) => {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("bodyInput").value;

    if (title && description) {
        const response = await fetch(`/api/Post/${Post[2]}`, {
            method: "PUT",
            body: JSON.stringify({
                title,
                description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        if (response.ok) {
            document.location.assign("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
};

const submitButton = document.getElementById("submitEdit");

// Event Listener
submitButton.addEventListener("submit", submitEdit);