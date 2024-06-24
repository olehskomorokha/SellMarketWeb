document.getElementById('signinBtn').addEventListener('click', loginUser);

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    const loginData = {
        Email: email,
        Password: password
    };

    try {
        const response = await fetch('https://localhost:7118/api/User/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            document.getElementById('message').innerText = `Error: ${errorText}`;
            return;
        }

        const token = await response.text();
        console.log('JWT Token:', token);

        // Store the token in localStorage or a cookie
        localStorage.setItem('jwtToken', token);

        // Redirect to main2.html
        window.location.href = 'main2.html';
        
    } catch (error) {
        console.error('Error logging in:', error);
    }
}
