

export function createCategory(array,) {
    const divCategory = document.getElementById("category");
    
    const uniqueCategories = Array.from(
      array.reduce((acc, event) => {
        acc.add(event.category);
        return acc;
      }, new Set())
    );
    
    uniqueCategories.forEach((element) => {
      const div = document.createElement("div");
      div.classList = "form-check pt-3 mb-3";
      div.innerHTML = `
        <div class="form-check">
          <input type="checkbox" class="form-check-input" value="${element}" />
          <label class="form-check-label">${element}</label>
        </div>`;
      divCategory.appendChild(div);
    });
  }
