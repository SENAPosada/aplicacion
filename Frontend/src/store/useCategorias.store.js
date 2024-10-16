import {create} from "zustand";
import axios from "axios";
import { endpoints } from "../config/endpoints"; // Asegúrate de que la ruta sea correcta
import { GetMethod } from "../config/methodsHttp";

const useCategoriasStore = create((set) => ({
    categorias: [],
    fetchCategorias: async () => {
      const data = await GetMethod(endpoints.categorias); 
      set({ categorias: data }); 
    },
  }));

export default useCategoriasStore;
