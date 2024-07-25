let slider_img = document.querySelector('.slider-img');
let images = [
];
let i = 0;
// // Отримати id з URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetchImages()
// Виконати запит до контролера
async function fetchImages() {
    try {
        const response = await fetch(`https://localhost:44383/api/Product/GetProductImg?productId=${productId}`);
        const data = await response.json();
        images = data[0].split(','); // Розбиваємо перший елемент по комі та зберігаємо в images
        console.log(images);
        setImg(); // Встановити перше зображення після заповнення масиву
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}
function prev() {
    if (i <= 0) i = images.length;
    i--;
    setImg();
}

function next() {
    if (i >= images.length - 1) i = -1;
    i++;
    setImg();
}

function setImg() {
    slider_img.setAttribute('src', images[0])
    if (images.length > 0) {
        slider_img.setAttribute('src', images[i]);
    }
}

document.querySelector('.img-btn.prev').addEventListener('click', prev);
document.querySelector('.img-btn.next').addEventListener('click', next);
