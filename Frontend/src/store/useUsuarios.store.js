// src/store/useUsuariosStore.js
import { create } from "zustand";
import { endpoints } from "../config/endpoints"; // Asegúrate de que la ruta sea correcta
import { GetMethod } from "../config/methodsHttp"; // Función para obtener datos desde el backend

const useUsuariosStore = create((set) => ({
  usuarios: [], // Almacenar todos los usuarios
  user: null, // Usuario autenticado
  fetchUsuarios: async () => {
    const data = await GetMethod(endpoints.usuarios); // Llamamos a la API
    set({ usuarios: data }); // Guardamos los usuarios en el estado
  },
  setUser: (user) => {
    // Verifica el objeto `user` y establece el estado global
    set({
      user: {
        ...user,
        role: user.roleId.name, // Asegúrate de que `roleId.name` sea el nombre del rol
      },
    });
  },
  logout: () => set({ user: null }), // Función para cerrar sesión
}));

export default useUsuariosStore;
