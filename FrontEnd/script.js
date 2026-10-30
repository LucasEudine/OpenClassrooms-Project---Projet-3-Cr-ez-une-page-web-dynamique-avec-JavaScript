const localToken = localStorage.getItem("token");

const header = document.querySelector("header");
const body = document.querySelector("body");

if (localToken !== null) {
    const editModeHeader_div = document.createElement("div");
    const editModeHeader_img = document.createElement("img");
    const editModeHeader_p = document.createElement("p");

    editModeHeader_div.className = "editModeHeader_div";
    editModeHeader_img.src = "assets/icons/edit-mode.png";
    editModeHeader_img.alt = "icone du mode édition";
    editModeHeader_img.className = "editModeHeader_img";
    editModeHeader_p.innerText = "Mode édition";
    editModeHeader_p.className = "editModeHeader_p";

    editModeHeader_div.appendChild(editModeHeader_img);
    editModeHeader_div.appendChild(editModeHeader_p);

    body.insertBefore(editModeHeader_div, header);

    const titreMesProjets = document.querySelector(".titreMesProjets");
    const mesProjets_img = document.createElement("img");
    mesProjets_img.src = "assets/icons/edit-mode.png";
    mesProjets_img.alt = "icone du mode édition";
    const mesProjets_p = document.createElement("p");
    mesProjets_p.innerText = "modifier";
    titreMesProjets.appendChild(mesProjets_img);
    titreMesProjets.appendChild(mesProjets_p);

    const aLogin = document.querySelector('a[href="./login.html"]');
    aLogin.textContent = "logout";

    aLogin.addEventListener("click", function(event) {
        localStorage.removeItem("token");
        aLogin.href = "./index.html";
    });
}

const response = await fetch("http://localhost:5678/api/works");
const projets = await response.json();
console.log(projets);

const gallery = document.querySelector(".gallery");

function afficherProjets(p) {
    gallery.innerHTML = "";
    for (let i = 0; i<p.length; i++) {
        const listeProjet = p[i];
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = listeProjet.imageUrl;
        image.alt = listeProjet.title;
        figure.appendChild(image);

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = listeProjet.title;
        figure.appendChild(figcaption);

        gallery.appendChild(figure);
    }
}
afficherProjets(projets)

const responseFiltres = await fetch("http://localhost:5678/api/categories");
const boutonsFiltre = await responseFiltres.json();

const classFiltres = document.querySelector(".filtres")

if (localToken !== null) {
    classFiltres.style.display = "none";
}

const premierBouton = document.createElement("button");
premierBouton.textContent = "Tous";
premierBouton.addEventListener("click", function () {
    afficherProjets(projets);
});
classFiltres.appendChild(premierBouton);


for (let i = 0; i<boutonsFiltre.length; i++) {
    const listeFiltres = boutonsFiltre[i];
    const button = document.createElement("button");

    button.textContent = listeFiltres.name;

    button.addEventListener("click", function () {
        const projetFiltre = projets.filter(function (projet) {
            return projet.categoryId === listeFiltres.id;
        });

        afficherProjets(projetFiltre)
    });

    classFiltres.appendChild(button)
}
