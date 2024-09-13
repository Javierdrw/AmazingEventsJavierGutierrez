import { pintarCardPage } from "../module/crearCard.js";
import { applyFilters } from "../module/filter.js";

pintarCardPage(); // Esto pinta la página inicial

document.getElementById("category").addEventListener("change", applyFilters);

document.getElementById("search").addEventListener("input", function (event) {
    event.preventDefault();
    applyFilters();
});
