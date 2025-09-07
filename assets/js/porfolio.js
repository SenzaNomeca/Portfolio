const gallery = document.getElementById("portfolioGallery");
const loader = document.getElementById("portfolioLoader");
const username = "SenzaNomeca"; // 👈 tu usuario de GitHub

// Mostrar loader
loader.style.display = "flex";

fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => {
        loader.style.display = "none"; // Ocultar loader al terminar

        if (data.length === 0) {
            gallery.innerHTML = "<p>No se encontraron proyectos en GitHub.</p>";
            return;
        }

        data.forEach(repo => {
            if (!repo.fork) {
                const figure = document.createElement("figure");
                figure.classList.add("gallery__item");

                figure.innerHTML = `
                    <div class="gallery__container-image">
                        <a href="${repo.html_url}" target="_blank" class="gallery__link">
                            <img src="assets/img/github-project.jpg" class="gallery__image" alt="${repo.name}">
                        </a>
                    </div>
                    <figcaption class="gallery__tittle">${repo.name}</figcaption>
                    <i class="gallery__icon fa-solid fa-code"></i>
                    <span class="gallery__category">${repo.language || "Proyecto"}</span>
                `;

                gallery.appendChild(figure);
            }
        });
    })
    .catch(err => {
        loader.style.display = "none"; // Ocultar loader también en error
        gallery.innerHTML = "<p>Error al cargar proyectos 😢</p>";
        console.error("Error cargando repos:", err);
    });
