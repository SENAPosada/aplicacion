import React, { useEffect, useState, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import SelectOptions from "../Citas/SelectOptions";
import TechnicalSupportCalendar from "../Calendar";
import clienteAxios from "../../config/axios";
import useTechnicalsStore from "../../store/useTechnicals.store";
import useClientsStore from "../../store/useClients.store";
import useSparesStore from "../../store/useSpares.store";

const EditarCita = () => {
    const navigate = useNavigate();
    const { fetchTechnicals, technicals } = useTechnicalsStore();
    const { fetchClients, clients } = useClientsStore();
    const { fetchSpares, spares } = useSparesStore();
    const { id } = useParams(); // Obtener el ID de la cita desde la URL

    const [data, setData] = useState({
        cliente: "",
        tecnico: "",
        repuesto: "",
        direccion: "",
        ciudad: "",
        fecha: new Date(),
        horario: "",
        estado: "Activado"
    });

    const horariosPosibles = [
        "8:00 AM - 10:00 AM",
        "10:00 AM - 12:00 PM",
        "12:00 PM - 02:00 PM",
        "2:00 PM - 4:00 PM",
    ];

    // Cargar la cita para editar
    const consultarCita = async () => {
        const respuesta = await clienteAxios.get(`/citas/${id}`);
        setData(respuesta.data);
    };

    useEffect(() => {
        consultarCita();
        fetchTechnicals();
        fetchClients();
        fetchSpares();
        console.log("Clientes:", clients); // Agregar este console.log
        console.log("Técnicos:", technicals); // Agregar este console.log
        console.log("Repuestos:", spares); // Agregar este console.log
    }, []);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {
        setData({
            ...data,
            fecha: date,
        });
    };

    const handleHorarioChange = (e) => {
        setData({
            ...data,
            horario: e.target.value,
        });
    };

    const actualizarCita = async (e) => {
        e.preventDefault();
        try {
            await clienteAxios.put(`/citas/${id}`, data);
            Swal.fire({
                icon: 'success',
                title: 'Cita Actualizada',
                text: 'Tu cita ha sido actualizada correctamente',
            }).then(() => {
                navigate('/citas');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar la cita',
            });
        }
    };

    return (
        <Fragment>
            <h2>Editar Cita</h2>
            <form onSubmit={actualizarCita}>
                <div className="form-group">
                    <label htmlFor="cliente">Seleccionar Cliente</label>
                    <SelectOptions
                        data={clients} // Asegúrate de tener los clientes disponibles
                        id="clientes"
                        name="cliente"
                        selectedValue={data.cliente}
                        handleChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tecnico">Seleccionar Técnico</label>
                    <SelectOptions
                        data={technicals} // Asegúrate de tener los técnicos disponibles
                        id="tecnicos"
                        name="tecnico"
                        selectedValue={data.tecnico}
                        handleChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="repuesto">Seleccionar Repuesto</label>
                    <SelectOptions
                        data={spares} // Asegúrate de tener los repuestos disponibles
                        id="repuestos"
                        name="repuesto"
                        selectedValue={data.repuesto}
                        handleChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={data.direccion}
                        onChange={handleChange}
                        placeholder="Ingresa la dirección"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad:</label>
                    <input
                        type="text"
                        id="ciudad"
                        name="ciudad"
                        value={data.ciudad}
                        onChange={handleChange}
                        placeholder="Ingresa la ciudad"
                    />
                </div>

                <TechnicalSupportCalendar onDateChange={handleDateChange} selectedDate={data.fecha} />

                <div className="form-group">
                    <label htmlFor="horario">Horario:</label>
                    <select
                        id="horario"
                        name="horario"
                        value={data.horario}
                        onChange={handleHorarioChange}
                    >
                        <option value="">Selecciona un horario</option>
                        {horariosPosibles.map((horario, index) => (
                            <option key={index} value={horario}>{horario}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-azul">
                    Actualizar Cita
                </button>
            </form>
        </Fragment>
    );
};

export default EditarCita;
