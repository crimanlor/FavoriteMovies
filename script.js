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
      <img src="${pelicula.imagen}" class="card-img-top" style="height: 25rem" alt="pelicula imagen">
      <div class="card-body card text-center">
      <h5 class="card-title">${pelicula.nombre}</h5>
      <p class="card-text">Director: ${pelicula.director}</p>
      <h6 class="card-subtitle mb-2 text-muted">${pelicula.clasificacion}</h6>
      <button id ="edit-${pelicula.id}" data-id="${pelicula.id}" data-action="edit" class="btn btn-outline-danger my-2">Editar</button>
      <button id="delete-${pelicula.id}" data-id="${pelicula.id}" data-action="delete" class="btn btn-danger">Delete</button>          
  </div>
      </div>`;
    })
  );

///POST///

peliculaForm.addEventListener("submit", (e) => {
  fetch(apiPeliculas, {
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
  });
});

///EDIT,DELETE///

peliculaCollection.addEventListener("click", (e) => {
  if (e.target.dataset.action === "edit") {
    const editButton = document.querySelector(`#edit-${e.target.dataset.id}`);
    editButton.disabled = true;

    const peliculaData = allPeliculas.find((pelicula) => {
      return pelicula.id == e.target.dataset.id;
    });

    e.target.parentElement.innerHTML += `<div id="edit-film">
      <form class="my-2" id ="edit-pelicula-form">
        <input class="my-1" required id ="edit-nombre" placeholder =" ${peliculaData.nombre} ">
        <input class="my-1" required id ="edit-imagen" placeholder =" ${peliculaData.imagen} ">
        <input class="my-1" required id ="edit-director" placeholder =" ${peliculaData.director} ">
        <input class="my-1" required id = "edit-clasificacion" placeholder= "${peliculaData.clasificacion} ">
        <input class="btn btn-dark my-1" type ="submit" value ="Guardar cambios">
      </form>
    </div> `;

    const editPeliculaForm = document.querySelector("#edit-pelicula-form");

    editPeliculaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombreInput = editPeliculaForm.querySelector("#edit-nombre").value;
      const imagenInput = editPeliculaForm.querySelector("#edit-imagen").value;
      const directorInput = editPeliculaForm.querySelector("#edit-director")
        .value;
      const clasificacionInput = editPeliculaForm.querySelector(
        "#edit-clasificacion"
      ).value;
      const editedPelicula = document.getElementById(`${peliculaData.id}`);

      fetch(`${apiPeliculas}/${peliculaData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreInput,
          imagen: imagenInput,
          director: directorInput,
          clasificacion: clasificacionInput,
        }),
      })
        .then((response) => response.json())
        .then((pelicula) => {
          editedPelicula.innerHTML = `<div class="card" style="width: 18rem;" id=${pelicula.id}>
              <img src="${pelicula.imagen}" class="card-img-top" alt="pelicula imagen">
              <div class="card-body card text-center">
              <h5 class="card-title">${pelicula.nombre}</h5>
              <p class="card-text">Director: ${pelicula.director}</p>
              <h6 class="card-subtitle mb-2 text-muted">${pelicula.clasificacion}</h6>
              <button id ="edit-${pelicula.id}" data-id="${pelicula.id}" data-action="edit" class="btn btn-outline-danger my-2">Editar</button>
              <button id="delete-${pelicula.id}" data-id="${pelicula.id}" data-action="delete" class="btn btn-danger">Delete</button>
              </div>
          </div>`;

          editPeliculaForm.innerHTML = "";
        });
    });
  } else if (e.target.dataset.action === "delete") {
    document.getElementById(`${e.target.dataset.id}`).remove();
    fetch(`${apiPeliculas}/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
});
