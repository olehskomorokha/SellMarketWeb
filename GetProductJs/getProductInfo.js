
    const productTitle = document.getElementById("product-title");
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    
    loadProductsInfo(id);
    console.log(id);

    function loadProductsInfo(id) {
        fetch(`https://localhost:44383/api/Product/GetProductById?id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {  // Зверніть увагу на назву змінної 'products', оскільки це масив
            const product = products[0];  // Отримуємо перший (і єдиний) елемент з масиву
            
            productTitle.innerHTML = '';
        
            const div = document.createElement('div');
            div.classList.add('productInfo');
            div.innerHTML = `
                <h3>${product.title}</h3>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                
                <p><strong>Seller:</strong> ${product.sellerName}</p>
            `;
        
            productTitle.appendChild(div);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }
    const categoryId = id;