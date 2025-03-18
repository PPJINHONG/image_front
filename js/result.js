document.addEventListener("DOMContentLoaded", function() {
    const imageUrl = localStorage.getItem('generatedImage');
    if (imageUrl) {
        document.getElementById('imageResult').src = imageUrl;
    } else {
        alert("No image found. Please generate an image first.");
        window.location.href = "/prompt.html";
    }
});
