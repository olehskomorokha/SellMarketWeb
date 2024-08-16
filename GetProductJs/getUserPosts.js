document.addEventListener("DOMContentLoaded", function() {

    const productList = document.getElementById("product-list");
    const myPostButton = document.getElementById("myPost");
    const token = localStorage.getItem("jwtToken");
    window.onload = function(){
        myPostButton.click();
    };
    // Function to load products based on category id
    async function loadProducts() {
        try {
            const response = await fetch(`https://localhost:44383/api/Product/GetUserPosts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const products = await response.json();

            productList.innerHTML = '';
            products.forEach(product => {
                const div = document.createElement('div');
                div.classList.add('product-card');
                div.innerHTML = `
                
                    <h3>${product.title}</h3>
                    <img src="${product.img}" alt="" class="product-img"/>
                    <p><strong>Ціна:</strong> $${product.price.toFixed(2)}</p>
                    <button id="deleteBtn${product.id}" class="delete-button">Видалити продукт</button>
                `;
                div.querySelector('.product-img').addEventListener('click', () => {
                    window.location.href = `../HtmlWithProduct/product.html?id=${product.id}`;
                    console.log(product);
                });
                productList.appendChild(div);
                
                 div.querySelector(`#deleteBtn${product.id}`).addEventListener('click', () => {
                    // Confirmation dialog
                    const result = confirm("Are you sure you want to delete this item?");
                    if (result) {
                        deleteProduct(product.id);// Call deleteProduct if confirmed
                        location.reload() 
                    }
                });
            });

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    // Function to delete a product
    async function deleteProduct(productId) {
        try {
            const response = await fetch(`https://localhost:44383/api/Product/DeleteProduct?productId=${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the JWT token to the Authorization header
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Продукт з ID ${productId} успішно видалено`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
    myPostButton.addEventListener('click', loadProducts);
});
