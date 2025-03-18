async function submitPrompt() {
    const prompt = document.getElementById('promptInput').value;
    const submitButton = document.querySelector('.submit-btn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const userId = localStorage.getItem('user_id');  // ✅ 로그인 시 저장된 user_id

    console.log("📝 Prompt:", prompt);
    console.log("👤 User ID:", userId);

    if (!prompt) {
        alert("Please enter a prompt!");
        return;
    }

    // ✅ 버튼 비활성화 & 로딩 화면 표시
    submitButton.disabled = true;
    loadingOverlay.style.display = 'flex';

    try {
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                prompt: prompt,
                user_id: userId ? parseInt(userId) : null  // ✅ user_id 포함해서 전송
            })
        });

        const data = await response.json();
        console.log("✅ Image Generation Response:", data);  // 디버깅용

        if (response.ok && data.image_url) {
            // ✅ 로컬 스토리지에 이미지 URL 저장
            localStorage.setItem('generatedImage', data.image_url);
            
            setTimeout(() => {
                loadingOverlay.style.display = 'none'; // ✅ 로딩창 숨기기
                window.location.href = "/result.html";  // 결과 페이지로 이동
            }, 1000); // 1초 후 이동
        } else {
            alert(`Error: ${data.detail || "Unknown error"}`);
        }
    } catch (error) {
        console.error("❌ Request failed:", error);
        alert("Error processing request");
    } finally {
        // ✅ 무조건 복원
        submitButton.disabled = false;
        loadingOverlay.style.display = 'none';
    }
}
