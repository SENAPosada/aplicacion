import {create} from "zustand";
import axios from "axios";
import { endpoints } from "../config/endpoints"; 
import { GetMethod } from "../config/methodsHttp";

const useCitasStore = create((set) => ({
    citas: [],
    fetchCitas: async () => {
      const data = await GetMethod(endpoints.citas); 
      set({ citas: data }); 
    },
  }));

export default useCitasStore;
