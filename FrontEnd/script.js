const responseProjets = await fetch("http://localhost:5678/api/works");
const projets = await responseProjets.json();
console.log(projets);

const gallery = document.querySelector(".gallery");

for (let i = 0; i<projets.length; i++) {
    const listeProjet = projets[i];
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

const responseFiltres = await fetch("http://localhost:5678/api/categories");
const boutonsFiltre = await responseFiltres.json();

const classFiltres = document.querySelector(".filtres")

const premierBouton = document.createElement("button");
premierBouton.textContent = "Tous";
classFiltres.appendChild(premierBouton);


for (let i = 0; i<boutonsFiltre.length; i++) {
    const listeFiltres = boutonsFiltre[i];
    const button = document.createElement("button");

    button.textContent = listeFiltres.name;

    classFiltres.appendChild(button)
}

