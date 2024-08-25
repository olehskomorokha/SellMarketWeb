let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let LastnameField = document.getElementById("LastnameField");
let PnodeField = document.getElementById("PnodeField");
let NicknameField = document.getElementById("NicknameField");
let title = document.getElementById("title");

// Error message creation function
function createErrorMessage(element, message) {
    let errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.style.color = 'red';
    errorSpan.innerText = message;
    element.parentNode.insertBefore(errorSpan, element.nextSibling);
}

signinBtn.onclick = function() {
    nameField.style.maxHeight = "0";
    LastnameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function() {
    nameField.style.maxHeight = "60px";
    LastnameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}
// //---------------------------------------login----------------------------
// document.getElementById('signipBtn').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     let email = document.getElementById('emailInput').value.trim();
//     let password = document.getElementById('passwordInput').value.trim();

//     const loginData = {
//         Email: email,
//         Password: password
//     };

//     try {
//         const response = await fetch('https://localhost:7118/api/User/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(loginData)
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             document.getElementById('message').innerText = `Error: ${errorText}`;
//             return;
//         }

//         const token = await response.text();
//         document.getElementById('message').innerText = 'Login successful!';
//         console.log('JWT Token:', token);

//         // You can now store the token in localStorage or a cookie if needed
//         localStorage.setItem('jwtToken', token);

//     } catch (error) {
//         console.error('Error logging in:', error);
//         document.getElementById('message').innerText = 'Error logging in';
//     }
// });



//---------------------------------------register-------------------------
document.getElementById('signupBtn').addEventListener('click', async () => {
    let firstName = document.getElementById('nameInput').value.trim();
    let lastName = document.getElementById('lastnameInput').value.trim();
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
        Email: email,
        Password: password
    };

    try {
        let response = await fetch('https://localhost:44383/api/User/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert('User registered successfully');
            window.location.href = '../main2.html';
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
