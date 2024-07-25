document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    let id = 3;
    // Function to load products based on category id
    function loadProducts(categoryId) {
        fetch(`https://localhost:44383/api/Product/GetAllProductBySubcategoryId?id=${id}`)
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
                div.classList.add('product-item');
                div.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Seller:</strong> ${product.sellerName}</p>   
                    <p><strong>Product ID:</strong> ${product.id}</p>
                `;
                div.addEventListener('click', () => {
                    window.location.href = `product.html?id=${product.Id}`;
                    console.log(product);
                });
                productList.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }

    // Call loadProducts automatically with a specific categoryId
    const categoryId = 'your-default-category-id'; // Replace with your desired category ID
    loadProducts(categoryId);
});