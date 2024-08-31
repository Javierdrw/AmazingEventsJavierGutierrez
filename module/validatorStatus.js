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

    const uniqueCategories = Array.from(
      dataEvents.reduce((acc, event) => {
        acc.add(event.category);
        return acc;
      }, new Set())
    );

    console.log(uniqueCategories);
    
    
    
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
            <td>Events with highest % of assistance</td>
            <td>Events with lowest % of assistance</td>
            <td>Events with larger capacity</td>
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
                  <td>Categories</td>
                  <td>Revenues</td>
                  <td>Percentage of assitance</td>
                </tr>
                ${uniqueCategories.map((category) => {
                  return `
                    <tr>
                      <th>${category}</th>
                      <td></td>
                      <td></td>
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
                  <td>Categories</td>
                  <td>Revenues</td>
                  <td>Percentage of assitance</td>
                </tr>
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                </tr>
      
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>`;
  })
}