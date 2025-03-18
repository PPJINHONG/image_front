document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('user_id');
    const container = document.getElementById('imagesContainer');

    console.log("✅ Page Loaded. user_id:", userId); // ⭐️ user_id 제대로 있는지 확인

    if (!userId) {
        alert("Login required!");
        window.location.href = "/index.html";
        return;
    }

    // ✅ 내 이미지 리스트 가져오기
    fetch(`/api/my-images?user_id=${userId}`)
        .then(response => {
            console.log("📡 API Response:", response); // ⭐️ API 응답 확인
            if (!response.ok) {
                throw new Error(`Failed to fetch images: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ My Images:", data);

            if (data.length === 0) {
                container.innerHTML = "<p>No images found.</p>";
                return;
            }

            // ✅ 이미지 리스트 렌더링
            data.forEach(image => {
                const col = document.createElement('div');
                col.classList.add('col-md-4', 'mb-4');

                // ✅ FastAPI 경유 URL로 이미지 가져오기 (보안 처리 가능)
                const imageApiUrl = `/api/get-image/${image.id}?user_id=${userId}`;

                col.innerHTML = `
                    <div class="card shadow">
                        <img src="${imageApiUrl}" class="card-img-top" alt="Generated Image" style="max-height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <p class="card-text"><strong>Prompt:</strong> ${image.prompt}</p>
                            <p class="card-text"><small>${new Date(image.created_at).toLocaleString()}</small></p>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        })
        .catch(error => {
            console.error("❌ Error fetching images:", error);
            container.innerHTML = "<p>Failed to load images. Please try again later.</p>";
        });
});
