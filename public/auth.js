// Display message in a modal pop-up
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    // Close modal when close button is clicked
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside of the modal content
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function loadRegister() {
    document.getElementById('form-title').innerText = 'Register';
    document.getElementById('auth-button').innerText = 'Register';
    document.getElementById('toggle-message').innerHTML = `Have an account? <a href="#" id="toggle-link">Login</a>`;

    const form = document.getElementById('auth-form');
    form.removeEventListener('submit', handleLogin);
    form.removeEventListener('submit', handleRegister);
    form.addEventListener('submit', handleRegister);

    document.getElementById('toggle-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadLogin();
    });
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        showModal(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadLogin() {
    document.getElementById('form-title').innerText = 'Login';
    document.getElementById('auth-button').innerText = 'Login';
    document.getElementById('toggle-message').innerHTML = `Don't have an account? <a href="#" id="toggle-link">Register</a>`;

    const form = document.getElementById('auth-form');
    form.removeEventListener('submit', handleRegister);
    form.removeEventListener('submit', handleLogin);
    form.addEventListener('submit', handleLogin);

    document.getElementById('toggle-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadRegister();
    });
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        showModal(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = loadLogin;
