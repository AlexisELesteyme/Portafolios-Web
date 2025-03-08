// Base de datos de proyectos
const proyectos = [
    {
        id: 1,
        titulo: "Subastas M.E.W",
        descripcion: "Subastas M.E.W es un sistema integral de subastas disponible en plataformas web, móviles y de escritorio, diseñado para facilitar la gestión y participación en subastas en línea. Desarrollado con HTML, CSS, JavaScript, C#, MySQL y ASP.NET, permite a los usuarios crear, administrar y ofertar en subastas de manera eficiente. Ofrece una interfaz intuitiva, gestión de usuarios, visualización de productos y un sistema seguro de pujas, brindando una experiencia fluida y confiable tanto para compradores como para vendedores.",
        imagenes: [
            "/public/imgs/Proximas.webp",
            "/public/imgs/MiProducto.webp",
            "/public/imgs/login.webp"
        ],
        tools: ["HTML", "CSS", "JavaScript", "C#", "MySQL", "ASP.NET", "React Native"]
    },
    {
        id: 2,
        titulo: "Eventos YA!",
        descripcion: "Este sistema de gestión de eventos, desarrollado en Laravel y MySQL, permite a los usuarios crear, administrar y visualizar eventos de manera eficiente. Utiliza un template predefinido para el frontend, ofreciendo una interfaz moderna y funcional. Incluye funcionalidades como la gestión de fechas, descripciones, colores personalizados, e invitaciones a otros usuarios y la opción de definir eventos de día completo, brindando una experiencia intuitiva y organizada.",
        imagenes: [
            "/public/imgs/inicioEvento.webp",
            "/public/imgs/CrearEvento.webp",
            "/public/imgs/eventoPublico.webp"
        ],
        tools: ["HTML", "CSS", "Laravel 11", "PHP", "MySQL"]
    }
];

function getProjectIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id")) || null;
}

// Función para mostrar el proyecto
function showProject() {
    const projectId = getProjectIdFromUrl();
    const proyecto = proyectos.find(p => p.id === projectId);

    if (!proyecto) return;

    const toolsHTML = proyecto.tools.map(tool => `<span class="tool">${tool}</span>`).join("");

    let carouselHTML = "";
    if (proyecto.imagenes && proyecto.imagenes.length > 0) {
        carouselHTML = `
        <div id="carousel" class="carousel">
            ${proyecto.imagenes.map((img, index) => `
            <div class="slide ${index === 0 ? "active" : ""}">
                <img src="${img}" alt="${proyecto.titulo} - imagen ${index + 1}">
            </div>
            `).join('')}
        </div>
        `;
    }

    document.getElementById("project-content").innerHTML = `
        <main class="main-project grid grid-cols-2 grid-rows-3 gap-1 p-4">
            <div class="project-title col-span-2 bg-blue-200 p-4 text-center">
                <h2>${proyecto.titulo}</h2>
            </div>
            <div class="project-image bg-blue-200 p-4">
                ${carouselHTML}
            </div>
            <div class="project-info bg-blue-200 p-4">
                <h3>Descripción</h3>
                <p>${proyecto.descripcion}</p>
                <div class="tools-container">
                    <h3>Herramientas</h3>
                    <div class="tools">${toolsHTML}</div>
                </div>
            </div>
        </main>
    `;

    initCarousel();
}

// Función para inicializar el carrusel
function initCarousel() {
    const carousel = document.getElementById("carousel");
    if (!carousel) return;

    const slides = carousel.getElementsByClassName("slide");
    let currentIndex = 0;

    function showSlide(index) {
        for (let slide of slides) {
            slide.classList.remove("active");
        }
        slides[index].classList.add("active");
    }

    function autoSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    setInterval(autoSlide, 3000);
}

// Verifica si estamos en la página correcta
if (window.location.href.includes("proyecto")) {
    showProject();
}

// Función para volver a la lista de proyectos
function goBack() {
    window.location.href = "index.html";
}

/*------------------ Toggler btn ------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".toggler-btn");
    if (toggler) {
        toggler.addEventListener("click", function () {
            const navbar = document.querySelector(".navbar ul");
            if (navbar) navbar.classList.toggle("active");
        });
    }
});