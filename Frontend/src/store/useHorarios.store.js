import {create} from "zustand";
import axios from "axios";
import { endpoints } from "../config/endpoints"; // Asegúrate de que la ruta sea correcta
import { GetMethod } from "../config/methodsHttp";

const useHorariosstore = create((set) => ({
    horarios: [],
    fetchHorarios: async () => {
      const data = await GetMethod(endpoints.horarios); 
      set({ horarios: data }); 
    },
  }));

export default useHorariosstore;
