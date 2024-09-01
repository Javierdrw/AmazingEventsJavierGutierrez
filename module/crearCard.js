import { createCategory } from "./createCategory.js";
// import { applyFilters } from "./filter.js";

export function pintarCardPage(arrayData) {
  const url1 = 'https://aulamindhub.github.io/amazing-api/events.json';
  let page = document.title;
  let sectionHome = document.querySelector(
    page === "Home" ? "#sectionHome" :
    page === "PAST-EVENTS" ? "#sectionPastEvents" :
    "#sectiomUpcomingEvents"
  );
  

  // Limpia la sección antes de pintar
  sectionHome.innerHTML = "";

  function pintarCard(array) {
    array.forEach((element) => {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${element.image}" class="p-2 card-img-top" alt="${element.name}">
        <div class="card-body">
        <h5 class="card-title text-center my-2">${element.name}</h5>
        <p class="card-text">${element.description}</p>
        <div class="d-flex justify-content-between">
        <h6 class="d-flex align-items-center">$${element.price}</h6>
        <a href="${page === "Home" ? `./pages/detail.html?id=${element._id}` : `./detail.html?id=${element._id}`}" class="btn card-2 btn-primary">Details</a>
        </div>
        </div>`;
        sectionHome.appendChild(card);
      });
    }
  
  function crearCard(array, currentDate) {
    const arrayUpcomingEvents = array.filter(evento => evento.date > currentDate);
    const arrayPastEvents = array.filter(evento => evento.date < currentDate);

    
    sectionHome.innerHTML = "";
    
    
    // pintarCard(arrayPastEvents);
    if (page === "Home") {
      if (array.length === 0) {
        sectionHome.innerHTML = "<p>No se ha encontrado ninguna coincidencia.</p>";
        return;
      } else {
        pintarCard(array);
      }
    } else if (page === "PAST-EVENTS") {
      if (arrayPastEvents.length === 0) {
        sectionHome.innerHTML = "<p>No se ha encontrado ninguna coincidencia.</p>";
        return;
      } else {
        pintarCard(arrayPastEvents);
      }
    } else {
      if (arrayUpcomingEvents.length === 0) {
        sectionHome.innerHTML = "<p>No se ha encontrado ninguna coincidencia.</p>";
        return;
      } else {
        pintarCard(arrayUpcomingEvents);
      }
    }

  }

    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        let dataEvents = data.events;
        
        if (arrayData){
          crearCard(arrayData, data.currentDate);
          
        }else{
          crearCard(dataEvents, data.currentDate);
          createCategory(dataEvents);

        }
      });
}

