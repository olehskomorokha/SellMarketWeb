
document.addEventListener('DOMContentLoaded', () => {
    fetchProductCategories();

    const form = document.getElementById('product-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(form);

        const fileInput = document.getElementById('photoUploader');
        for (const file of fileInput.files) {
            formData.append('files', file);
        }
        
        const productInfo = {
            Title: formData.get('title'),
            Description: formData.get('description'),
            Price: parseFloat(formData.get('price')),
            Category: parseInt(formData.get('category'))
        };
        // Append product info to formData
        for (const key in productInfo) {
            formData.append(key, productInfo[key]);
        }
        try {
            const response = await fetch('https://localhost:44383/api/Product/addProduct', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Assuming you have the token stored in localStorage
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result); // Log the result or handle success
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    });
});

async function fetchProductCategories() {
    try {
        const response = await fetch('https://localhost:44383/api/Product/GetSubcategoriesByCategoryId?Id=1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        console.log(categories); // Log the fetched data

        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '';

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // Assuming `id` is the correct property name for the category ID
            option.textContent = category.category; // Assuming `category` is the correct property name for the category name
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}
