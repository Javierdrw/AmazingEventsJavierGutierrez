import { pintarCardPage } from "../module/crearCard.js";
import { applyFilters } from "../module/filter.js";

pintarCardPage(); // Esto pinta la página inicial

document.getElementById("category").addEventListener("change", applyFilters);

document.getElementById("search-button").addEventListener("click", function (event) {
    event.preventDefault();
    applyFilters();
});
