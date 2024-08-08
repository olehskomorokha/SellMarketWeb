document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    // Отримуємо параметри з URL
    const params = new URLSearchParams(window.location.search);
   
    // Зчитуємо параметр `id` з URL і зберігаємо його в змінну `id`
    let id = params.get('id');
    console.log(id);

         // Якщо параметр `id` відсутній в URL, можна призначити значення за замовчуванням
   
    // Function to load products based on category id
    function loadProducts(id) {
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

    // Call loadProducts automatically with a specific categoryId
    const categoryId = id; // Replace with your desired category ID
    loadProducts(categoryId);
});