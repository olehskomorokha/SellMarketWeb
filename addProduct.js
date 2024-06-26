let resizedImageURL = ''; // Variable to store the resized image URL

document.getElementById('photoUploader').addEventListener('change', function(event) {
    const photoPreview = document.getElementById('photoPreview');
    photoPreview.innerHTML = ''; // Clear previous previews

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Resize the image to 300x300 pixels while maintaining aspect ratio
                const maxSize = 300;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Convert canvas to data URL and store it in the variable
                resizedImageURL = canvas.toDataURL('image/jpeg');

                // Display the resized image preview on the page
                const previewImg = document.createElement('img');
                previewImg.src = resizedImageURL;
                photoPreview.appendChild(previewImg);
            };
        };

        reader.readAsDataURL(file);
    }
});
//--------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    fetchProductCategories();

    const form = document.getElementById('product-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const productInfo = {
            Title: formData.get('title'),
            Description: formData.get('description'),
            Price: parseFloat(formData.get('price')),
            Category: parseInt(formData.get('category')),
            ImgURL: resizedImageURL // Use the resized image URL here
        };

        try {
            const response = await fetch('https://localhost:7118/api/Product/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Assuming you have the token stored in localStorage
                },
                body: JSON.stringify(productInfo)
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
        const response = await fetch('https://localhost:7118/api/Product/GetSubcategoriesByCategoryId?Id=1');
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