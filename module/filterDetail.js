let url = window.location.href;
console.log(url);
let urlParrans = new URL(url);
console.log(urlParrans);

let urlObjeto = new URLSearchParams(urlParrans.search);

let detailAShow = urlObjeto.get("id");

export function filterDetail() {
  const sectionDetail = document.getElementById("sectionDetail");
  sectionDetail.innerHTML = "";
  const url1 = 'https://aulamindhub.github.io/amazing-api/events.json';

  fetch(url1).then((response) => response.json()).then((data) => {
    let evento = data.events
      evento = evento.filter((e) => e._id == detailAShow);
      console.log(evento[0]);
      
        
      if (evento) {
        let valueToShow =
          new Date(evento[0].date) > new Date(data.currentDate)
            ? "estimate"
            : "assistance";
    
        let card = document.createElement("div");
        card.classList = "d-flex flex-md-row flex-column p-3 gap-3";
        card.innerHTML = `
            <div class="col-md-6 col-sm-12 col-12 p-2 my-auto">
                <img
                  class="col-12"
                  src="${evento[0].image}"
                  alt="${evento[0].name}"
                />
              </div>
              <div class="col-md-6 col-sm-12 p-2 col-12">
                <h2 class="text-center">${evento[0].name}</h2>
                <p><b>Date:</b> ${evento[0].date}</p>
                <p><b>Description:</b> ${evento[0].description}</p>
                <div class="grid">
                  <p><b>Category:</b> ${evento[0].category}</p>
                <p><b>Place:</b> ${evento[0].place}</p>
                <p><b>Capacity:</b> ${evento[0].capacity}</p>
                <p><b>${
                  valueToShow.charAt(0).toUpperCase() + valueToShow.slice(1)
                }:</b> ${evento[0][valueToShow]}</p>
                <p><b>Price:</b> ${evento[0].price}</p></div>
              </div>`;
    
        sectionDetail.appendChild(card);
      } else {
        sectionDetail.innerHTML = "<p>Event not found.</p>";
      }

  })
}

