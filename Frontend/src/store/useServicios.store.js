import {create} from "zustand";
import axios from "axios";
import { endpoints } from "../config/endpoints"; // Asegúrate de que la ruta sea correcta
import { GetMethod } from "../config/methodsHttp";

const useServiciosStore = create((set) => ({
    servicios: [],
    fetchServicios: async () => {
      const data = await GetMethod(endpoints.servicios); 
      set({ servicios: data }); 
      // console.log({data})
    },
  }));

export default useServiciosStore;
