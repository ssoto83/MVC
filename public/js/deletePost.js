const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log("clicked me");
    console.log(event.target);
  
    let Post = window.location.pathname.split("/");
    console.log(Post);
  
    const response = await fetch(`/api/Post/${Post[2]}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  };
  
  const deleteButton = document.querySelectorAll("#deleteBtn");
  
  // Iterates over all buttons on the page allowing for delete functionality
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePostHandler);
  }