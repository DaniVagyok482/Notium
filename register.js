const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const eyeIcon = document.getElementById('eyeIcon');

toggleBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
});