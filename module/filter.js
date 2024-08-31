import { pintarCardPage } from "./crearCard.js";

let searchValue = ""; // Declara searchValue globalmente si es necesario

document.getElementById("search-button").addEventListener("click", function (event) {
    event.preventDefault();
    searchValue = document.querySelector("#search").value.toLowerCase().trim();
   
    
    applyFilters(); 
});

export function applyFilters() {
  let checked = document.querySelectorAll("input[type=checkbox]:checked");
  let selectedCategories = Array.from(checked).map(
    (checkbox) => checkbox.value
  );
  let page = document.title;
  let sectionHome = document.querySelector(
    page === "Home" ? "#sectionHome" :
    page === "PAST-EVENTS" ? "#sectionPastEvents" :
    "#sectiomUpcomingEvents"
  );
  
  const url1 = 'https://aulamindhub.github.io/amazing-api/events.json';

  fetch(url1).then((response) => response.json()).then((data) => {
    let filteredArray  = data.events;
    

    if (selectedCategories.length > 0) {
      filteredArray = FilterByCategory(selectedCategories, filteredArray);
      
    }
    console.log(searchValue);
    

      filteredArray = FilterBySearch(filteredArray, searchValue);
    
    
    // Limpia antes de pintar para evitar duplicados
    sectionHome.innerHTML = "";
    // Llama a pintarCardPage pasando el array filtrado
    pintarCardPage(filteredArray);

  });
}

const FilterBySearch = (arrayObjet, search) => {
  return arrayObjet.filter(
    (objeto) =>
      objeto.name.toLowerCase().trim().includes(search) ||
      objeto.description.toLowerCase().trim().includes(search)
  );
  
}

function FilterByCategory(arrayElementos, arrayObjetos) {
  return arrayObjetos.filter((objeto) =>
    arrayElementos.includes(objeto.category)
  );
}
