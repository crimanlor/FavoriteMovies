"use strict";

///GET///
const apiPeliculas = "http://localhost:3000/peliculas";
const peliculaCollection = document.getElementById("peliculas-container");
const peliculaForm = document.getElementById("add-pelicula-form");
let allPeliculas = [];

fetch(apiPeliculas)
  .then((response) => response.json())
  .then((peliculaData) =>
    peliculaData.forEach(function (pelicula) {
      allPeliculas = peliculaData;
      peliculaCollection.innerHTML += `<div class="card" style="width: 18rem;" id=${pelicula.id}>
      <img src="${pelicula.imagen}" class="card-img-top" alt="pelicula imagen">
      <div class="card-body card text-center">
      <h5 class="card-title">${pelicula.nombre}</h5>
      <p class="card-text">Director: ${pelicula.director}</p>
      <h6 class="card-subtitle mb-2 text-muted">${pelicula.clasificacion}</h6>
      <button data-id="${pelicula.id}" data-action="edit" class="btn btn-outline-danger my-2">Editar</button>
      <button data-id="${pelicula.id}" data-action="delete" class="btn btn-danger">Delete</button>
      </div>
      </div>`;
    })
  );

///POST///

peliculaForm.addEventListener("submit", (e) => {
  fetch(apiPeliculas, {
    method: "POST",
    headers: {
      "Content-Type": "aplicación / json",
    },
    body: JSON.stringify({
      nombre: `${event.target.nombre.value}`,
      imagen: `${event.target.imagen.value}`,
      director: `${event.target.director.value}`,
      clasificacion: `${event.target.clasificacion.value}`,
    }),
  })
    .then((response) => response.json())
    .then((pelicula) => {
      peliculaCollection.innerHTML += `<div class="card" style="width: 18rem;" id=${pelicula.id}>
          <img src="${pelicula.imagen}" class="card-img-top" alt="pelicula imagen">
          <div class="card-body card text-center">
          <h5 class="card-title">${pelicula.nombre}</h5>
          <p class="card-text">Director: ${pelicula.director}</p>
          <h6 class="card-subtitle mb-2 text-muted">${pelicula.clasificacion}</h6>
          <button data-id="${pelicula.id}" data-action="edit" class="btn btn-outline-danger my-2">Editar</button>
          <button data-id="${pelicula.id}" data-action="delete" class="btn btn-danger">Delete</button>          </div>
        </div>`;
    });
});

///EDIT,DELETE///
peliculaCollection.addEventListener("click", (e) => {
  if (e.target.dataset.action === "edit") {
    const peliculaData = allPeliculas.find((pelicula) => {
      return pelicula.id == e.target.dataset.id;
    });
    console.log(peliculaData);
  }
});
