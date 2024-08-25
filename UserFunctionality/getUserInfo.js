document.addEventListener('DOMContentLoaded', () => {
const MyProfile = document.getElementById("MyProfile");

loadUserInfo();


function loadUserInfo() {
    fetch(`https://localhost:44383/api/User/getUserInfo`, {
        method: 'GET',  // Specify the method (optional for GET, but good practice)
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,  // Add the JWT token to the Authorization header
            'Content-Type': 'application/json'   // Specify the content type
        }
    }) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(users => {  // Зверніть увагу на назву змінної 'products', оскільки це масив
          // Отримуємо перший (і єдиний) елемент з масиву
       
       
        const user = users[0];
        MyProfile.innerHTML = '';


        const div = document.createElement('div');


        div.classList.add('UserInfo');
        div.innerHTML = `
            <h1>Редагування профілю</h1>
            <p>Ім'я: ${user.firstName}</p>
            <p>Прізвище: ${user.lastName}</p>
            <p>Email: ${user.userEmail}</p>
            
        `;
        
        MyProfile.appendChild(div);

    })
    .catch(error => {
        console.error('Error fetching user info:', error);
        MyProfile.innerHTML = `<p>Error loading user information</p>`;
    });
}
})