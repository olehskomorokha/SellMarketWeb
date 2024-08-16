document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons and content divs
    const buttons = {
        myPost: document.getElementById('myPost'),
        Profile: document.getElementById('Profile'),
        ProfileSettings: document.getElementById('ProfileSettings')
    };

    const sections = {
        myPost: document.querySelector('.myPostClass'),
        Profile: document.querySelector('.MyProfileClass'),
        ProfileSettings: document.querySelector('.MyProfileSettingsClass')
    };

    // Function to switch between sections
    function switchSection(activeButtonId) {
        for (let key in sections) {
            if (key === activeButtonId) {
                sections[key].style.display = 'block';
                buttons[key].classList.add('active');
            } else {
                sections[key].style.display = 'none';
                buttons[key].classList.remove('active');
            }
        }
    }

    // Event listeners for buttons
    buttons.myPost.addEventListener('click', () => switchSection('myPost'));
    buttons.Profile.addEventListener('click', () => switchSection('Profile'));
    buttons.ProfileSettings.addEventListener('click', () => switchSection('ProfileSettings'));

    // Set default active section
    switchSection('myPost');
});
