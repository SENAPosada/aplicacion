const API_BASE_URL = "http://localhost:5000";

export const endpoints = {
  technicals: `${API_BASE_URL}/tecnicos`,
  clients: `${API_BASE_URL}/clientes`,
  spares: `${API_BASE_URL}/repuestos`,
  citas: `${API_BASE_URL}/citas`,
  horarios: `${API_BASE_URL}/horarios`,
  servicios: `${API_BASE_URL}/servicios`,
  categorias: `${API_BASE_URL}/categorias`,
  ventas: `${API_BASE_URL}/ventas`,
//   deleteTechnicals: (id) => `${API_BASE_URL}/tecnicos/${id}`
};
