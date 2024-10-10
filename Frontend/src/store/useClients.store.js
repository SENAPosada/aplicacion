import {create} from "zustand";
import axios from "axios";
import { endpoints } from "../config/endpoints"; // Asegúrate de que la ruta sea correcta
import { GetMethod } from "../config/methodsHttp";

const useClientsStore = create((set) => ({
    clients: [],
    fetchClients: async () => {
      const data = await GetMethod(endpoints.clients); // Llamamos a la API
      set({ clients: data }); // Guardamos los datos y marcamos como fetched
    },
  }));

export default useClientsStore;
