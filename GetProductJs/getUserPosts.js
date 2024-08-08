document.addEventListener("DOMContentLoaded", function() {
    
    const productList = document.getElementById("product-list");
    const myPostButton = document.getElementById("myPost");
    const token = localStorage.getItem("jwtToken");
    // Function to load products based on category id
    function loadProducts() {
        fetch(`https://localhost:44383/api/Product/GetUserPosts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
                'Content-Type': 'application/json'
            }
    })
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            productList.innerHTML = '';
            products.forEach(product => {
                const div = document.createElement('div');
                div.classList.add('product-card');
                div.innerHTML = `
                      <h3>${product.title}</h3>
                      <img src="${product.img}" alt="" />
                      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                `;
                div.addEventListener('click', () => {
                    window.location.href = `../HtmlWithProduct/product.html?id=${product.id}`;
                    console.log(product);
                });
                productList.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }

   
    myPostButton.addEventListener('click', loadProducts)
    
});