// Valodacion de resgitro de usuarios 
document.addEventListener("DOMContentLoaded", function () {
    const formPaso1 = document.getElementById("formPaso1");
    const formPaso2 = document.getElementById("formPaso2");
    const btnSiguientePaso = document.getElementById("siguietePaso");
    const formRegistro = document.getElementById("formRegistro");

    // Validamso el paso 1 del formulario de registro
    const validacionPaso1 = new JustValidate("#formPaso1", { 
        validateBeforeSubmitting: true,
    });

    validacionPaso1
        .addField("#Nombreregistro", [
            { rule: "required", errorMessage: "El nombre es obligatorio" },
            { rule: "minLength", value: 3, errorMessage: "Debe tener al menos 3 caracteres" }
        ])
        .addField("#ApellidosRegistro", [
            { rule: "required", errorMessage: "Los apellidos son obligatorios" },
            { rule: "minLength", value: 3, errorMessage: "Debe tener al menos 3 caracteres" }
        ]);

    btnSiguientePaso.addEventListener("click", function (e) {
        e.preventDefault(); // Evitar envío por defecto
        validacionPaso1.revalidate().then((isValid) => {
            if (isValid) {
                formPaso1.classList.add("oculto"); // Ocultamos el paso 1
                formPaso2.classList.remove("oculto"); // Mostramos el paso 2
                document.getElementById("paso1").classList.add("progreso__paso__active"); // cambiamos el color de la barra de progreso
            }
        });
    });

    // Validamos el paso 2 del formulario de registro
    const validacionPaso2 = new JustValidate("#formPaso2", {
        validateBeforeSubmitting: true,
    });

    validacionPaso2
        .addField("#CorreoRegistro", [
            { rule: "required", errorMessage: "El correo es obligatorio" },
            { rule: "email", errorMessage: "Debe ser un correo válido" }
        ])
        .addField("#passwordRegistro", [
            { rule: "required", errorMessage: "La contraseña es obligatoria" },
            { rule: "minLength", value: 8, errorMessage: "Debe tener al menos 8 caracteres" },
            { rule: "customRegexp", value: /(?=.*[A-Z])(?=.*[0-9])/, errorMessage: "Debe incluir una mayúscula y un número" }
        ])
        .addField("#confirmPassRegistro", [
            { rule: "required", errorMessage: "Debes confirmar tu contraseña" },
            {
                validator: (value) => {
                    return value === document.getElementById("passwordRegistro").value;
                },
                errorMessage: "Las contraseñas no coinciden"
            }
        ]);

    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
        validacionPaso2.revalidate().then((isValid) => {
            if (isValid) {
                formPaso2.classList.add("oculto"); // Ocultamos el paso 2
                document.getElementById("paso2").classList.add("progreso__paso__active"); // cambiamos el color de la barra de progreso
                document.getElementById("ResgitroExitoso").classList.remove("oculto");
            }
        });
    });
});


