
    const productTitle = document.getElementById("product-title");
    const userDescription = document.getElementById("user-description");
    const productDescription = document.getElementById("product-description");

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
            userDescription.innerHTML = '';
            productDescription.innerHTML = '';

            const divPDesc = document.createElement('div');
            const divDesc = document.createElement('div');
            const div = document.createElement('div');

            div.classList.add('productInfo');
            div.innerHTML = `
            
                <p><strong>Дата публікації:</strong> ${product.dateOfPublish.substring(0,10)}</p>
                <h3>${product.title}</h3>
                <p><strong>Price:</strong> $${product.price}</p>
            `;
            
            divDesc.classList.add('UserDescription')
            divDesc.innerHTML = `
                
                <p><strong>Продавець:</strong></p>
                
                <p>${product.sellerName}</p>
            
            `
            divPDesc.classList.add('ProductDescription')
            divPDesc.innerHTML = `
                <h1>Опис</h1>
                <p> ${product.description}</p>
            `

            productDescription.appendChild(divPDesc);
            userDescription.appendChild(divDesc);
            productTitle.appendChild(div);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }
    const categoryId = id;