document.getElementById('signupBtn').addEventListener('click', async () => {
    let firstName = document.getElementById('nameInput').value.trim();
    let lastName = document.getElementById('lastnameInput').value.trim();
    let phoneNumber = document.getElementById('phoneInput').value.trim();
    let nickName = document.getElementById('nicknameInput').value.trim();
    let email = document.getElementById('emailInput').value.trim();
    let password = document.getElementById('passwordInput').value.trim();

    // Remove any existing error messages
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());

    // Validation
    let valid = true;
    if (!firstName) {
        createErrorMessage(document.getElementById('nameInput'), 'Name is required');
        valid = false;
    }
    if (!lastName) {
        createErrorMessage(document.getElementById('lastnameInput'), 'Last Name is required');
        valid = false;
    }
    if (!phoneNumber) {
        createErrorMessage(document.getElementById('phoneInput'), 'Phone number is required');
        valid = false;
    }
    if (!nickName) {
        createErrorMessage(document.getElementById('nicknameInput'), 'nickname is required');
        valid = false;
    }
    if (!email || !validateEmail(email)) {
        createErrorMessage(document.getElementById('emailInput'), 'Valid email is required');
        valid = false;
    }
    if (!password || password.length < 6) {
        createErrorMessage(document.getElementById('passwordInput'), 'Password must be at least 6 characters');
        valid = false;
    }

    if (!valid) {
        return;
    }

    let user = {
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber,
        NickName: nickName,
        Email: email,
        Password: password
    };

    try {
        let response = await fetch('https://localhost:7118/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert('User registered successfully');
            window.location.href = 'main.html';
        } else {
            createErrorMessage(document.getElementById('emailInput'), 'email already exist');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering user');
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
