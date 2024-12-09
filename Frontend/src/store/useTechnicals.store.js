import { create } from "zustand";
import { endpoints } from "../config/endpoints"; 
import { GetMethod } from "../config/methodsHttp"; 

const useTechnicalsStore = create((set) => ({
  technicals: [],
  fetchTechnicals: async () => {
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage
    const data = await GetMethod(endpoints.technicals, null, token); // Pasar el token al hacer la solicitud
    set({ technicals: data }); // Guardar los datos obtenidos
  },
}));

export default useTechnicalsStore;
