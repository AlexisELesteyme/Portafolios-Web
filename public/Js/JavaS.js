/*------------------Toggler btn------------------*/

document.querySelector('.toggler-btn').addEventListener('click', function () {
    const navbar = document.querySelector('.navbar ul');
    navbar.classList.toggle('active');
});


/*----------------------------------------Formulario de contacto-------------------------------------------*/
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener los valores de los campos
    const name = document.getElementById("name").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Verificar si algún campo está vacío
    if (!name || !apellido || !email || !numero || !mensaje) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor, completa todos los campos antes de enviar el mensaje.",
        });
        return;
    }

    // Construcción del objeto formData
    const formData = { name, apellido, email, numero, mensaje };

    Swal.fire({
        title: "Enviando mensaje...",
        text: "Por favor espera",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await fetch("https://alexis-portafolios-web.onrender.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Mensaje enviado",
                text: "Tu mensaje fue enviado correctamente",
                timer: 3000,
                showConfirmButton: false
            });
            document.getElementById("contactForm").reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error || "Hubo un problema al enviar el mensaje"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo."
        });
    }
});

/*AOS Animation MOBILE*/

document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        disable: window.innerWidth <= 768 
    });
});