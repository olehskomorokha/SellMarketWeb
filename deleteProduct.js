document.addEventListener('DOMContentLoaded', () => {
    const ID = getElementById
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        

       

        try {
            const response = await fetch('https://localhost:44383/api/Product/DeleteProduct?productId=${}', {
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