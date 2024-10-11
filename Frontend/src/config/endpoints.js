const API_BASE_URL = "http://localhost:5000";

export const endpoints = {
  technicals: `${API_BASE_URL}/tecnicos`,
  clients: `${API_BASE_URL}/clientes`,
  spares: `${API_BASE_URL}/repuestos`,
  citas: `${API_BASE_URL}/citas`,
//   deleteTechnicals: (id) => `${API_BASE_URL}/tecnicos/${id}`
};
