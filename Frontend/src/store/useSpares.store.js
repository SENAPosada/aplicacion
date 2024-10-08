import { create } from "zustand";
import axios from "axios";
import { endpoints } from "../endpoints";
import { GetSpares } from "../componentes/repuestos/callSpares";

const useSparesStore = create((set) => ({
    spares: [],
    fetchSpares: async () => {
        const data = await GetSpares(endpoints.spares);
        set({ spares: data });
    },
}));

export default useSparesStore;
