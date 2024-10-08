import { create } from "zustand";
import { GetTechnicals } from "../componentes/tecnicos/callTechnicals";//metodos http
import { endpoints } from "../endpoints";//apuntamientos al backend

const useTechnicalsStore = create((set) => ({
  technicals: [],
  fetchTechnicals: async () => {
    const data = await GetTechnicals(endpoints.technicals); // Llamamos a la API
    set({ technicals: data }); // Guardamos los datos y marcamos como fetched
  },
}));

export default useTechnicalsStore;
