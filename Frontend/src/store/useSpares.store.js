import { create } from "zustand";
import axios from "axios";
import { endpoints } from "../config/endpoints";
import { GetMethod } from "../config/methodsHttp";

const useSparesStore = create((set) => ({
    spares: [],
    fetchSpares: async () => {
        const data = await GetMethod(endpoints.spares);
        set({ spares: data });
    },
}));

export default useSparesStore;
