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

// Desplegar y ocultar las preguntas frecuentes
document.addEventListener("DOMContentLoaded", () => {
    const preguntas = document.querySelectorAll(".faq__pregunta");

    preguntas.forEach(pregunta => {
        pregunta.addEventListener("click", () => {
            const item = pregunta.parentNode;
            item.classList.toggle("activo");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const idiomaSeleccionado = document.getElementById("idioma-seleccionado");
    const idiomaLista = document.querySelector(".idioma__lista");

    // Obtener idioma guardado en LocalStorage o establecer español por defecto
    let idiomaActual = localStorage.getItem("idioma") || "es";

    // Función para cargar los textos en el idioma seleccionado
    function cargarIdioma(idioma) {
        const langFile = `./assets/lang/lang-${idioma}.json`;
    
        fetch(langFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos cargados:", data); // 🔥 Para depuración
    
                document.querySelectorAll("[data-section]").forEach(elemento => {
                    const section = elemento.getAttribute("data-section"); // "header"
                    const value = elemento.getAttribute("data-value"); // "inicio"
    
                    if (data[section] && data[section][value]) {
                        elemento.textContent = data[section][value];
                    }
                });
    
                localStorage.setItem("idioma", idioma);
            })
            .catch(error => console.error("Error cargando idioma:", error));
    }

    // Cambiar el idioma al hacer clic en una opción del desplegable
    idiomaLista.addEventListener("click", (event) => {
        if (event.target.closest("li")) {
            let nuevoIdioma = event.target.closest("li").getAttribute("data-lang");
            idiomaActual = nuevoIdioma;
            cargarIdioma(idiomaActual);

            // Cambiar icono del botón principal
            let imgSrc = event.target.closest("li").querySelector("img").src;
            idiomaSeleccionado.innerHTML = `<img src="${imgSrc}" alt="${nuevoIdioma}">`;

            // Cerrar el menú
            idiomaLista.parentNode.classList.remove("activo");
        }
    });

    // Mostrar/ocultar desplegable al hacer clic en el botón de idioma
    idiomaSeleccionado.addEventListener("click", () => {
        idiomaLista.parentNode.classList.toggle("activo");
    });

    // Cargar el idioma guardado al iniciar la página
    cargarIdioma(idiomaActual);
});


// Modo oscuro
document.getElementById("modo-seleccionado").addEventListener("click", function() {

    document.body.classList.toggle("modo-oscuro");
    

    const img = this.querySelector("img");
    if (document.body.classList.contains("modo-oscuro")) {
        img.src = "assets/img/icons/dark.png"; // Imagen para modo oscuro
    } else {
        img.src = "assets/img/icons/luz.png"; // Imagen para modo claro
    }
});