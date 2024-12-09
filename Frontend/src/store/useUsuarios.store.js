// src/store/useUsuariosStore.js
import { create } from "zustand";
import { endpoints } from "../config/endpoints"; // Asegúrate de que la ruta sea correcta
import { GetMethod } from "../config/methodsHttp"; // Función para obtener datos desde el backend

const useUsuariosStore = create((set) => ({
  usuarios: [],
  user: null,
  fetchUsuarios: async () => {
    const token = localStorage.getItem("token"); // Obtén el token
    const data = await GetMethod(endpoints.usuarios, null, token); // Pasa el token
    set({ usuarios: data });
  },
  setUser: (user) => {
    set({
      user: {
        ...user,
        role: user.roleId.name,
      },
    });
  },
  logout: () => set({ user: null }),
}));

export default useUsuariosStore;
