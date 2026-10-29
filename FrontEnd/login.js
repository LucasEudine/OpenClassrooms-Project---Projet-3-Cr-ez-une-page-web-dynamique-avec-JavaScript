const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formEmail = document.querySelector("#email").value;
    const formPassword = document.querySelector("#password").value;

    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({email: formEmail, password: formPassword}),
        headers: { "Content-Type": "application/json" }
    });
    const login = await responseLogin.json();

    if (responseLogin.ok) {
        localStorage.setItem("token", login.token);
        window.location.href = "./index.html";
    } else {
        alert("E-mail ou mot de passe incorrect.");
    }
})

