document.addEventListener('DOMContentLoaded', () => {
    // Example: Fetch user data from the server
    async function fetchUserData() {
        try {
            const response = await fetch('//user'); 
            if (!response.ok) throw new Error('Failed to fetch user data');
            const userData = await response.json();
            // Display user data on the dashboard
            document.querySelector('#user-info').innerText = `Welcome, ${userData.username}!`;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    // Call the function to fetch user data when the page loads
    fetchUserData();
});