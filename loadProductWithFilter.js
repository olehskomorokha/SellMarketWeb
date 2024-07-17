document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    const minPrice = document.getElementById("inputVid");
    const maxPrice = document.getElementById("inputDo");
    const filterButton = document.getElementById("filter-button");

    let id = 3;
    // Function to load products based on category id
    function loadProducts(categoryId, minPrice, maxPrice) {
        let url = `https://localhost:44383/api/Product/GetAllProductBySubcategoryWithFilterId?id=${categoryId}`;

        if (minPrice) {
            url += `&minPrice=${minPrice}`;
        }
        if (maxPrice) {
            url += `&maxPrice=${maxPrice}`;
        }
        fetch(url)
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
     // Add event listener to the filter button
     filterButton.addEventListener('click', function() {
        const minPrice = inputVid.value;
        const maxPrice = inputDo.value;
        loadProducts(id, minPrice, maxPrice);
    });
    // Call loadProducts automatically with a specific categoryId
    const categoryId = 'your-default-category-id'; // Replace with your desired category ID
    loadProducts(categoryId);
});