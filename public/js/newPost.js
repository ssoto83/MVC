async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector("#titleInput").value.trim();
    const description = document.querySelector("#bodyInput").value.trim();

    if (title && description) {
        const response = await fetch(`/api/Post`, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

// Event Listener
document
    .querySelector(".createPost")
    .addEventListener("submit", newPostHandler);