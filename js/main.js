// Añadimos la clase active a la pagina en la que estamos navegando
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navbar__links a");

    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});

// Solo se ejecuta en la pagina de planes
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("Planes.html")) {
        const planProfesional = document.querySelector(".cartas--planes.profesional");
        if (planProfesional) {
            planProfesional.classList.add("destacado");
        }
    }
});

// Animación de las cartas de los pasos
const observerOptions = {
    root: null, // Observamos en el viewport
    threshold: 0.2 // La carta será visible cuando al menos el 20% del elemento esté en el viewport
};


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Activamos la animación cuando el elemento es visible
            observer.unobserve(entry.target); // Dejamos de observar el elemento una vez que es visible
        }
    });
}, observerOptions);

// Seleccionamos todas las cartas de los pasos
const cartasPasos = document.querySelectorAll('.carta--pasos');

// Comenzamos a observar cada carta
cartasPasos.forEach(carta => {
    observer.observe(carta); // Comenzamos a observar cada carta
});

// Opciones para el IntersectionObserver
const observerConfig = {
    root: null, // Observamos en el viewport
    threshold: 0.2 // El footer será visible cuando al menos el 20% del elemento esté en el viewport
};

// Creamos el IntersectionObserver
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('footer--visible'); // Activamos la animación cuando el elemento es visible
            observer.unobserve(entry.target); // Dejamos de observar el footer una vez que es visible
        }
    });
}, observerConfig);

// Seleccionamos el footer
const footerElement = document.querySelector('.footer');

// Comenzamos a observar el footer
scrollObserver.observe(footerElement);

// Script para mostrar y ocultar los enlaces de la hamburguesa
const hamburger = document.querySelector('.navbar_hamburguesa');
const links = document.querySelector('.navbar__links');
const actions = document.querySelector('.navbar__actions');

hamburger.addEventListener('click', () => {
    links.classList.toggle('active');
    actions.classList.toggle('active');
});