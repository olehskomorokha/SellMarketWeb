async function fetchProductCategoryDetails() {
    try {
        const response = await fetch(`https://localhost:7118/api/Product/GetProductSubcategory?Id=${1}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categoryDetails = await response.json();
        console.log(categoryDetails); // Log the fetched data

        const detailList = document.getElementById('detail-list');
        detailList.innerHTML = '';

        categoryDetails.forEach(detail => {
            const detailBox = document.createElement('div');
            detailBox.classList.add('detail-box');
            detailBox.innerText = detail.category; // Assuming `detail` is the correct property name

            detailList.appendChild(detailBox);
        });
    } catch (error) {
        console.error('Error fetching category details:', error);
    }
}

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchProductCategoryDetails(1));