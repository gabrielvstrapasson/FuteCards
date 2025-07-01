
// Esse é o código de registro, register.html

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector('input[name="password"]');
            const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');

            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            const storedEmail = localStorage.getItem('registeredEmail');

            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                return;
            }

            if (emailInput.value === storedEmail) {
                alert('E-mail já cadastrado. Por favor, use outro e-mail.');
                return;
            }


            localStorage.setItem('registeredName', name);
            localStorage.setItem('registeredEmail', email);
            localStorage.setItem('registeredPassword', password);

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
            });
        }
    });

// Esse é o código de login, login.html

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.querySelector('input[name="email"]');
            const passwordInput = document.querySelector('input[name="password"]');
            const email = emailInput.value;
            const password = passwordInput.value;

            const storedEmail = localStorage.getItem('registeredEmail');
            const storedPassword = localStorage.getItem('registeredPassword');

            if (email === storedEmail && password === storedPassword) {
                alert('Login realizado com sucesso!');
                window.location.href = 'index.html'; 
            } else {
                alert('E-mail ou senha incorretos. Por favor, tente novamente.');
            }
            });
        }
    });
