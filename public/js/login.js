const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Sign up handler
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (name && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Event Listeners
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
    // Handle signup
//     if (signupForm) {
//         signupForm.addEventListener('submit', async (event) => {
//             event.preventDefault();

//             // Gather input values
//             const email = document.querySelector('#email-signup').value;
//             const password = document.querySelector('#password-signup').value;
//             const confirmPassword = document.querySelector('#confirm-password').value;

//             if (password !== confirmPassword) {
//                 alert("Passwords do not match.");
//                 return;
//             }

//             try {
//                 // Send signup request
//                 const response = await fetch('/signup', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ email, password })
//                 });

//                 // Check if the signup was successful
//                 if (response.ok) {
//                     const data = await response.json();
//                     // Handle successful signup (e.g., redirect to login)
//                     alert('Signup successful! You can now log in.');
//                     window.location.href = '/login'; // Redirect to login page
//                 } else {
//                     const error = await response.json();
//                     alert(error.message || 'Signup failed. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error during signup:', error);
//                 alert('An unexpected error occurred. Please try again later.');
//             }
//         });
//     }
// });
