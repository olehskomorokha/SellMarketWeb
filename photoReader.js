// document.getElementById('photoUploader').addEventListener('change', function(event) {
//     const photoPreview = document.getElementById('photoPreview');
//     photoPreview.innerHTML = ''; // Clear previous previews

//     const files = event.target.files;
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             const img = new Image();
//             img.src = e.target.result;

//             img.onload = function() {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');

//                 // Resize the image to 300x300 pixels while maintaining aspect ratio
//                 const maxSize = 300;
//                 let width = img.width;
//                 let height = img.height;

//                 if (width > height) {
//                     if (width > maxSize) {
//                         height *= maxSize / width;
//                         width = maxSize;
//                     }
//                 } else {
//                     if (height > maxSize) {
//                         width *= maxSize / height;
//                         height = maxSize;
//                     }
//                 }

//                 canvas.width = width;
//                 canvas.height = height;
//                 ctx.drawImage(img, 0, 0, width, height);

//                 // Convert canvas to data URL and append to preview
//                 const resizedImage = canvas.toDataURL('image/jpeg');
//                 const previewImg = document.createElement('img');
//                 previewImg.src = resizedImage;
//                 photoPreview.appendChild(previewImg);
//             };
//         };

//         reader.readAsDataURL(file);
//     }
// });
