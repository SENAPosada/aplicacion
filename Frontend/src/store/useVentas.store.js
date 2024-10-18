import { create } from "zustand";
import { endpoints } from "../config/endpoints";//apuntamientos al backend
import { GetMethod } from "../config/methodsHttp";;//metodos http

const useVentasStore = create((set) => ({
  ventas: [],
  fetchVentas: async () => {
    const data = await GetMethod(endpoints.ventas); // Llamamos a la API
    set({ ventas: data }); // Guardamos los datos y marcamos como fetched
  },
}));

export default useVentasStore;
