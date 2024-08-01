async function fetchProductCategories() {
    try {
        const response = await fetch('https://localhost:44383/api/Product/GetProductCategory');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        console.log(categories); // Log the fetched data

        const productList = document.getElementById('productcategory-list');
        productList.innerHTML = '';

        const pageMap = {
            1: 'HTML/kotushki.html',
            2: 'HTML/vudochki.html'
        };

        categories.forEach(category => {
            const categoryBox = document.createElement('div');
            categoryBox.classList.add('category-box');
            categoryBox.innerText = category.category; // Assuming `category` is the correct property name

            // Add click event listener to each category box
            categoryBox.addEventListener('click', () => {
                const targetPage = pageMap[category.id]; // Navigate based on category ID
                if (targetPage) {
                    window.location.href = targetPage;
                } else {
                    alert('Page not found for this category');
                }
            });

            productList.appendChild(categoryBox);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchProductCategories);

