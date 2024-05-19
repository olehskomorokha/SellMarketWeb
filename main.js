document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    const fetchProductsButton = document.getElementById("fetch-products");
    const categoryIdInput = document.getElementById("category-id");
    // Function to load products based on category id
    function loadProducts(categoryId, keyword = '') {
        fetch(`https://localhost:7118/api/Product/GetAll?Id=${categoryId}&keyword=${keyword}`)
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
                `;
                productList.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Add event listener to the button to fetch products based on input category ID
fetchProductsButton.addEventListener('click', () => {
    const categoryId = categoryIdInput.value;
    if (categoryId) {
        loadProducts(categoryId);
    } else {
        alert('Please enter a valid category ID.');
    }
});
});