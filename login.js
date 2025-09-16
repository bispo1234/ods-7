// Script específico para a página de login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o envio do formulário por padrão

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            console.log("Nome de usuário:", username);
            console.log("Senha:", password);

            alert("Login em desenvolvimento! As informações de login foram capturadas e podem ser enviadas para um servidor.");
        });
    }
});
