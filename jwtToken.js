document.getElementById('login-form').addEventListener('submit', loginUser);
async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        Email: email,
        Password: password
    };

    try {
        const response = await fetch('https://localhost:44383/api/User/login', {
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
        document.getElementById('message').innerText = 'Login successful!';
        console.log('JWT Token:', token);

        // Store the token in localStorage or a cookie
        localStorage.setItem('jwtToken', token);


    } catch (error) {
        console.error('Error logging in:', error);
        document.getElementById('message').innerText = 'Error logging in';
    }
}