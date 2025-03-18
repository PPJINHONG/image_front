function register() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log("📦 회원가입 시도 데이터:", { name, username, password }); // ✅ 확인용 로그

    fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ 서버 응답 데이터:", data); // ✅ 서버 실제 응답 확인

        if (data.msg === "User created successfully") {
            alert("Registration successful! Redirecting to login page.");
            window.location.href = "/index.html";  // ✅ 로그인 페이지로 이동
        } else {
            alert(data.detail || "Registration failed");
            console.error("🚨 Registration Error:", data.detail);
        }
    })
    .catch(error => {
        alert("An error occurred. Check console for details.");
        console.error("❌ Network Error:", error);
    });
}
