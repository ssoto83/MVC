document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const signupForm = document.querySelector('#signup-form');

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
        });
    }

    // Handle signup
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Perform signup logic here
        });
    }

    
});
