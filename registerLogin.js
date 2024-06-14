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
    PnodeField.style.maxHeight = "0";
    NicknameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function() {
    nameField.style.maxHeight = "60px";
    LastnameField.style.maxHeight = "60px";
    PnodeField.style.maxHeight = "60px";
    NicknameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}

