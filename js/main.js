function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(async (response) => {
        const data = await response.json();
        console.log("✅ Login Response:", data);  // 디버깅용 콘솔

        if (response.ok && data.msg === "Login successful") {  // ✅ 여기까지만 확인

            // ✅ user_id가 있으면 저장
            if (data.user_id) {
                localStorage.setItem('user_id', String(data.user_id));
                console.log("✅ 저장된 user_id:", data.user_id);
            }

            // ✅ 메인 페이지로 이동
            window.location.href = "/main.html";
        } else {
            alert(data.detail || "Login failed. Please check your username and password.");
            console.error("🚨 Login Error:", data.detail || data);
        }
    })
    .catch(error => {
        alert("server error sorry~ Please try again later.");
        console.error("❌ Network Error:", error);
    });
}
