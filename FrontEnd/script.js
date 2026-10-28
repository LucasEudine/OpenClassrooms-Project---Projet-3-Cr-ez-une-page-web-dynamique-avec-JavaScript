const response = await fetch("http://localhost:5678/api/works");
const projets = await response.json();
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