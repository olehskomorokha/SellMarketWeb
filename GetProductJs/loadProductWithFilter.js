        document.addEventListener("DOMContentLoaded", function() {
            const productList = document.getElementById("product-list");
            const minPriceInput = document.getElementById("inputVid");
            const maxPriceInput = document.getElementById("inputDo");
            const sortTypeSelect = document.getElementById("sortType");
            const filterButton = document.getElementById("filter-button");

            // Отримуємо параметри з URL
            const params = new URLSearchParams(window.location.search);
   
            // Зчитуємо параметр `id` з URL і зберігаємо його в змінну `id`
            let id = params.get('id');

            function loadProducts(categoryId, minPrice, maxPrice, sortType) {
                let url = `https://localhost:44383/api/Product/GetAllProductBySubcategoryWithFilterId?id=${categoryId}`;

                if (minPrice) {
                    url += `&minPrice=${minPrice}`;
                }
                if (maxPrice) {
                    url += `&maxPrice=${maxPrice}`;
                }
                if (sortType) {
                    url += `&sortType=${sortType}`;
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
                        div.classList.add('product-card');
                        div.innerHTML = `
                                    <h3>${product.title}</h3>
                                    <img src="${product.img}" alt="" />
                                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                            `;
                            div.addEventListener('click', () => {
                                window.location.href = `../HtmlWithProduct/product.html?id=${product.id}`;
                                
                            });
                    productList.appendChild(div);
                    });
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
            }

            filterButton.addEventListener('click', function() {
                const minPrice = minPriceInput.value;
                const maxPrice = maxPriceInput.value;
                const sortType = sortTypeSelect.value;
                console.log(sortType);
                loadProducts(id, minPrice, maxPrice, sortType);
            });

            // Call loadProducts automatically with a specific categoryId
            const categoryId = id; // Use your desired category ID here
            loadProducts(categoryId);
        });