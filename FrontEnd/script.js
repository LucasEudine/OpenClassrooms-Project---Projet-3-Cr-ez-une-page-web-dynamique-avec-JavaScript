const responseProjets = await fetch("http://localhost:5678/api/works");
const projets = await responseProjets.json();
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
