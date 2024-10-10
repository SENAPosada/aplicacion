import { create } from "zustand";
import { endpoints } from "../config/endpoints";//apuntamientos al backend
import { GetMethod } from "../config/methodsHttp";;//metodos http

const useTechnicalsStore = create((set) => ({
  technicals: [],
  fetchTechnicals: async () => {
    const data = await GetMethod(endpoints.technicals); // Llamamos a la API
    set({ technicals: data }); // Guardamos los datos y marcamos como fetched
  },
}));

export default useTechnicalsStore;
