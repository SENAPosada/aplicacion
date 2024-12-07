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
  usuarios: `${API_BASE_URL}/usuarios`,
//   deleteTechnicals: (id) => `${API_BASE_URL}/tecnicos/${id}`

  // Endpoints para Permisos, Roles y RolePermissions
  permissions: `${API_BASE_URL}/permissions`, // Gestión de permisos
  roles: `${API_BASE_URL}/roles`, // Gestión de roles
  rolePermissions: `${API_BASE_URL}/role-permissions`, // Asignar permisos a roles
};
