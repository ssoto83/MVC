document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.querySelector('#signup-username').value;
            const password = document.querySelector('#signup-password').value;
            const email = document.querySelector('#signup-email').value; // If you have an email field

            try {
                const response = await fetch('/signup', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, email })
                });

                if (response.ok) {
                    // Optionally redirect to the dashboard or show a success message
                    window.location.href = '/dashboard'; 
                } else {
                    const errorData = await response.json();
                    alert(errorData.message); // Display error message
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('Signup failed. Please try again.');
            }
        });
    }
});
