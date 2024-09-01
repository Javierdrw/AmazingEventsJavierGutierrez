export function calcularGananciasYAsistenciaPorCategoriaDeFuturoEventos(eventos, fechaActual) {
    const resultadoPorCategoria = {}; // Objeto para almacenar las ganancias y porcentajes de asistencia por categoría
  
    eventos.forEach(evento => {
      const fechaEvento = new Date(evento.date);
      const fechaHoy = new Date(fechaActual);
      
      // Verificar si el evento es futuro
      if (fechaEvento > fechaHoy) {
        const categoria = evento.category;
        const ganancias = evento.price * evento.estimate; // Calcular las ganancias
        const asistenciaPorcentual = (evento.estimate / evento.capacity) * 100; // Calcular el porcentaje de asistencia
  
        // Si la categoría ya tiene una entrada, sumamos las ganancias y el porcentaje de asistencia
        if (resultadoPorCategoria[categoria]) {
          resultadoPorCategoria[categoria].ganancias += ganancias;
          resultadoPorCategoria[categoria].totalAsistencia += evento.estimate;
          resultadoPorCategoria[categoria].totalCapacidad += evento.capacity;
        } else {
          // Si es la primera vez que encontramos la categoría, la inicializamos
          resultadoPorCategoria[categoria] = {
            category: categoria,
            ganancias: ganancias,
            totalAsistencia: evento.estimate,
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