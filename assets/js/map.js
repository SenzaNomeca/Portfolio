    document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        document.querySelector("#load-iframe-map").innerHTML = `
            <iframe class="contact__iframe" frameborder="0" scrolling="0" marginheight="0" marginwidth="0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.711467767452!2d-74.80891255965557!3d10.98513748922166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d1366b6dd21%3A0x98f91feb2f572f4f!2sCl.%2069d%2C%20El%20Recreo%2C%20Barranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses!2sco!4v1721580976519!5m2!1ses!2sco"  ></iframe>
            `;
    }, 500);  /*Esto es milisegundo */

    });