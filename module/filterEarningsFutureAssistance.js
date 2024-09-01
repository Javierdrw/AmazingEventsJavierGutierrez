export function calcularGananciasYAsistenciaPorCategoriaDeEventosPasados(eventos, fechaActual) {
    const resultadoPorCategoria = {}; // Objeto para almacenar las ganancias y porcentajes de asistencia por categoría
  
    eventos.forEach(evento => {
      const fechaEvento = new Date(evento.date);
      const fechaHoy = new Date(fechaActual);
  
      // Verificar si el evento es pasado
      if (fechaEvento < fechaHoy) {
        const categoria = evento.category;
        const ganancias = evento.price * evento.assistance; // Calcular las ganancias
        const asistenciaPorcentual = (evento.assistance / evento.capacity) * 100; // Calcular el porcentaje de asistencia
  
        // Si la categoría ya tiene una entrada, sumamos las ganancias y el porcentaje de asistencia
        if (resultadoPorCategoria[categoria]) {
          resultadoPorCategoria[categoria].ganancias += ganancias;
          resultadoPorCategoria[categoria].totalAsistencia += evento.assistance;
          resultadoPorCategoria[categoria].totalCapacidad += evento.capacity;
        } else {
          // Si es la primera vez que encontramos la categoría, la inicializamos
          resultadoPorCategoria[categoria] = {
            category: categoria,
            ganancias: ganancias,
            totalAsistencia: evento.assistance,
            totalCapacidad: evento.capacity
          };
        }
      }
    });
  
    // Calcular el porcentaje de asistencia final para cada categoría
    for (const categoria in resultadoPorCategoria) {
      const totalAsistencia = resultadoPorCategoria[categoria].totalAsistencia;
      const totalCapacidad = resultadoPorCategoria[categoria].totalCapacidad;
      const porcentajeAsistencia = (totalAsistencia / totalCapacidad) * 100;
  
      resultadoPorCategoria[categoria].porcentajeAsistencia = porcentajeAsistencia.toFixed(2) + "%";
    }
  
    return resultadoPorCategoria;
  }