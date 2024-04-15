const form_login = document.getElementById('login-form');
form_login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
            

    try {
        //http://localhost:3009/api/login
        const response = await fetch('http://localhost:3009/La_holandesa/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username, 
                password 
            })          
        });

                
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = 'http://127.0.0.1:5500/front/pages/usuarios.html'; // Redirige al panel de control
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                
            });
            Toast.fire({
                icon: "warning",
                title: "Usuario o contraseña incorrectos"
            });
        }
                
    } catch (err) {
        console.error('Error al enviar la solicitud:', err);
        alert('Error al enviar la solicitud');
    }
});

