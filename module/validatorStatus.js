import { calcularGananciasYAsistenciaPorCategoriaDeFuturoEventos } from "./filterEarningsAttendancePast.js";
import { calcularGananciasYAsistenciaPorCategoriaDeEventosPasados } from "./filterEarningsFutureAssistance.js";
const url = 'https://aulamindhub.github.io/amazing-api/events.json';


export function pinterTable() {
  fetch(url).then(res => res.json()).then(data => {
    let dataEvents = data.events;
    function getEventWithHighestAttendance() {
      let highestAttendanceEvent = null;
      let highestAttendance = 0;
    
      dataEvents.map((event) => {
        
        const attendancePercentage = (event.assistance / event.capacity) * 100;
    
        if (attendancePercentage > highestAttendance) {
          highestAttendance = attendancePercentage;
          highestAttendanceEvent = event;
        }
      })
    
      return highestAttendanceEvent;
    }
   
    const CGPAEF = calcularGananciasYAsistenciaPorCategoriaDeFuturoEventos(dataEvents, data.currentDate);
    
    const arrayDeCategorias = Object.values(CGPAEF);

    const CGPAEP = calcularGananciasYAsistenciaPorCategoriaDeEventosPasados(dataEvents, data.currentDate);

    const arrayDeCategoriasEP = Object.values(CGPAEP);
    function getEventWithLowestAttendance() {
      let LowestAttendanceEvent = null;
      let minorAssistance = Infinity; // Inicializa con un valor muy grande
    
      dataEvents.map((event) => {
        const attendancePercentage = (event.assistance / event.capacity) * 100;
    
        if (attendancePercentage < minorAssistance) {
          minorAssistance = attendancePercentage;
          LowestAttendanceEvent = event;
        }
      })
    
      return LowestAttendanceEvent;
    }
    const maxEvent = dataEvents.reduce((max, current) => {
      return current.capacity > max.capacity ? current : max;
    }, dataEvents[0]);

    const eventWithHighestAttendance = getEventWithHighestAttendance();
    const eventWithLowestAttendance = getEventWithLowestAttendance();
    

    let table = document.getElementById("stats");
    table.innerHTML = `
        <thead>
          <tr class="table-dark">
            <th scope="col" colspan="3">Events Statistics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Events with highest % of assistance</th>
            <th>Events with lowest % of assistance</th>
            <th>Events with larger capacity</th>
          </tr>
          <tr>
            <td>${eventWithHighestAttendance.name}</td>
            <td>${eventWithLowestAttendance.name}</td>
            <td>${maxEvent.name}</td>
          </tr>
        </tbody>
     </table>
        <table class="table container table-bordered mb-0">
            <thead>
                <tr class="table-dark">
                  <th scope="col" colspan="3">
                    Upcoming events statistics by category
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text-center">Categories</th>
                  <th class="text-center">Revenues</th>
                  <th class="text-center">Percentage of assitance</th>
                </tr>
                ${arrayDeCategorias.map((category) => {
                  return `
                    <tr>
                      <td class="text-center">${category.category}</td>
                      <td class="text-center">${category.ganancias.toLocaleString('es-ES')} $</td>
                      <td class="text-center">${category.porcentajeAsistencia}</td>
                    </tr>
                  `;
                }).join("")}
                
              </tbody>
        </table>

        <table class="table container table-bordered">
            <thead>
                <tr class="table-dark">
                  <th scope="col" colspan="3">Past events statistics by category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text-center">Categories</th>
                  <th class="text-center">Revenues</th>
                  <th class="text-center">Percentage of assitance</th>
                </tr>
                ${arrayDeCategoriasEP.map((category) => {
                  return `
                    <tr>
                      <td class="text-center">${category.category}</td>
                      <td class="text-center">${category.ganancias.toLocaleString('es-ES')} $</td>
                      <td class="text-center">${category.porcentajeAsistencia}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>`;
  })
}