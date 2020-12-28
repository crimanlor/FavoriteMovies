"use strict";

function fetchPeliculas() {
  fetch("http://localhost:3000/peliculas")
    .then((response) => response.json())
    .then(renderMovies);
}

const peliculaCollection = document.getElementById("peliculas-container");
function renderMovies(peliculas) {
  peliculaCollection.innerHTML = "";
  peliculas.forEach(function (pelicula) {
    peliculaCollection.innerHTML += `<div class="card" style="width: 18rem;" data-id=${pelicula.id}>
        <img src="${pelicula.imagen}" class="card-img-top" alt="pelicula imagen">
        <div class="card-body card text-center">
          <h5 class="card-title">${pelicula.nombre}</h5>
          <p class="card-text">Director: ${pelicula.director}</p>
          <h6 class="card-subtitle mb-2 text-muted">${pelicula.clasificacion}</h6>
          <button id="edit" data-action="edit" class="btn btn-outline-danger my-2">Edit</button>
          <button id="delete" data-action="delete" class="btn btn-danger">Delete</button>
        </div>
    </div>`;
  });
}

fetchPeliculas();

const addPeliculaForm = document.getElementById("add-pelicula-form");
let allPeliculas = [];
addPeliculaForm.addEventListener("submit", function (event) {
  fetch("http://localhost:3000/peliculas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: `${event.target.nombre.value}`,
      imagen: `${event.target.imagen.value}`,
      director: `${event.target.director.value}`,
      clasificacion: `${event.target.clasificacion.value}`,
    }),
  })
    .then((resp) => resp.json())
    .then(renderMovies);
});

// const buttonDelete = document.getElementById

// fetch(`http://localhost:3000/peliculas/${id}`, {
//   method: "DELETE",
// })
//   .then((response) => response.json())
//   .then(fetchPeliculas);

peliculaCollection.addEventListener("click", (e) => {
  if (e.target.dataset.action === "edit") {
    console.log("pulsaste editar");
  } else if (e.target.dataset.action === "delete") {
    console.log("presionaste eliminar");
  }
});
