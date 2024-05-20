document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById("signupBtn");
    const signinBtn = document.getElementById("signinBtn");
    const title = document.getElementById("title");
    const hideableFields = document.querySelectorAll('.input-field.hideable');

    signinBtn.onclick = function () {
        hideableFields.forEach(field => {
            field.classList.add('hidden');
        });
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
    }

    signupBtn.onclick = function () {
        hideableFields.forEach(field => {
            field.classList.remove('hidden');
        });
        title.innerHTML = "Sign Up";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");
    }
});