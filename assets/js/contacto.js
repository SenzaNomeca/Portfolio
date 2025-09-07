document.addEventListener('DOMContentLoaded', function(){

    const email = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }

    const formulario = document.querySelector('#formulario');
    const inputNombre = document.querySelector("#nombre");
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const btnSubmit = document.querySelector('#formulario input[type="submit"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    function validar(e){
        const campo = e.target.id;
        const contenido = e.target.value.trim();

        if(!contenido){
            email[e.target.name] = '';
            mostrarAlerta(`El campo ${campo} es obligatorio`, e.target.parentElement);
            comprobarEmail();
            return;
        }

        if(campo === "email" && !validarEmail(contenido)){
            email[e.target.name] = '';
            mostrarAlerta("El email no es válido", e.target.parentElement);
            comprobarEmail();
            return;
        }
        
        limpiaAlerta(e.target.parentElement);

        email[e.target.name] = contenido.toLowerCase();
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, contenedor){
        limpiaAlerta(contenedor);

        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add(
            'alert', 'alert-danger',
            'text-center', 'mx-auto', 'mt-4', 'w-75'
        );
        
        contenedor.appendChild(error);
    }

    function limpiaAlerta(contenedor){
        const alerta = contenedor.querySelector(".alert");
        if(alerta){
            alerta.remove();
        }
    }
    
    function validarEmail(email){
        const val = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return val.test(email);
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.disabled = true;
            btnSubmit.classList.add('opacity-50');  
            return;
        } 
        btnSubmit.disabled = false;
        btnSubmit.classList.remove('opacity-50');  
    }

    function enviarEmail(e){
        e.preventDefault();
        spinner.style.visibility = "visible";

        emailjs.send("service_nrmpkmd", "template_rtx8dpo", {
            from_name: email.name,
            from_email: email.email,
            subject: email.subject,
            message: email.message
        })
        .then(() => {
            console.log("Correo enviado correctamente ✅");
            spinner.style.visibility = "hidden";
            formulario.reset();

            // resetear el objeto email
            email.name = '';
            email.email = '';
            email.subject = '';
            email.message = '';
            comprobarEmail();
        })
        .catch(err => {
            console.error("Error:", err);
            spinner.style.visibility = "hidden";
        });
    }
});
