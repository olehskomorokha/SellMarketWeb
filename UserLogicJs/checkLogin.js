document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwtToken');
    const loginButton = document.getElementById('login-button');
    const homeButton = document.getElementById('Home-button');

    if (token) {
        loginButton.style.display = 'none';
        homeButton.style.display = 'inline-block';
    } else {
        loginButton.style.display = 'inline-block';
        homeButton.style.display = 'none';
        document.getElementById('addProduct-button').addEventListener('click', () => {
            window.location.href = 'registerLogin.html';
    });
}});
document.getElementById('Home-button').addEventListener('click', () => {
    window.location.href = '../HTML/Home.html';
});
document.getElementById('addProduct-button').addEventListener('click', () => {
    window.location.href = '../HTML/createAnAd.html';
});