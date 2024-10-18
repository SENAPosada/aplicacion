import React, { useEffect, useState } from "react";
import useVentasStore from "../../store/useVentas.store";

const Dashboard = () => {
    const { fetchVentas, ventas } = useVentasStore();

    useEffect(() => {
        fetchVentas();

    }, []);
    console.log({ ventas })
    return (
        <>
            <h2>Dashboard</h2>

        </>
    );
};
export default Dashboard;
