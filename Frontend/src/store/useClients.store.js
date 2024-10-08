import {create} from "zustand";
import axios from "axios";
import { endpoints } from "../endpoints"; // Asegúrate de que la ruta sea correcta
import { Getclients } from "../componentes/clientes/callClients";

const useClientsStore = create((set) => ({
    clients: [],
    fetchClients: async () => {
      const data = await Getclients(endpoints.clients); // Llamamos a la API
      set({ clients: data }); // Guardamos los datos y marcamos como fetched
    },
  }));

export default useClientsStore;
