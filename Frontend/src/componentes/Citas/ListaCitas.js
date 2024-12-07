import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useClientsStore from "../../store/useClients.store";

function CitasList() {
    const [citas, setCitas] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null);
    const { fetchClients, clients } = useClientsStore();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await clienteAxios.get('/citas');
                const citasActivas = response.data.filter(cita => cita.estado !== "Finalizado");
                setCitas(citasActivas);
            } catch (error) {
                console.error("Error al obtener las citas:", error);
            }
        };

        const fetchTecnicos = async () => {
            try {
                const response = await clienteAxios.get('/tecnicos');
                setTecnicos(response.data);
            } catch (error) {
                console.error("Error al obtener los técnicos:", error);
            }
        };

        fetchCitas();
        fetchTecnicos();
        fetchClients();
    }, []);

    const eliminarCita = (idCita) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una cita eliminada no se puede recuperar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/citas/${idCita}`)
                    .then(res => {
                        Swal.fire("¡Eliminado!", res.data.mensaje, "success");
                        setCitas(citas.filter(cita => cita._id !== idCita));
                    })
                    .catch(() => {
                        Swal.fire("Error", "No se pudo eliminar la cita", "error");
                    });
            }
        });
    };

    const cambiarEstado = async (idCita, nuevoEstado) => {
        try {
            const response = await clienteAxios.put(`/citas/${idCita}`, { estado: nuevoEstado });
            Swal.fire("¡Estado Actualizado!", response.data.mensaje, "success");
    
            const citaActualizada = citas.find(cita => cita._id === idCita);
            citaActualizada.estado = nuevoEstado;
            setCitas(citas.map(cita => cita._id === idCita ? citaActualizada : cita));
    
            if (nuevoEstado === "Finalizado") {
                // Crear una copia de citaActualizada sin el campo "estado"
                const citaSinEstado = { ...citaActualizada };
                delete citaSinEstado.estado;
    
                await clienteAxios.post("/ventas", citaSinEstado);
                Swal.fire("¡Cita Guardada en Ventas!", "La cita se ha enviado correctamente a la sección de ventas", "success");
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el estado de la cita", "error");
        }
    };
    

    const mostrarModal = (repuestos) => {
        setRepuestoSeleccionado(repuestos);
    };

    const cerrarModal = () => {
        setRepuestoSeleccionado(null);
    };

    return (
        <Fragment>
            {citas.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Técnico</th>
                            <th>Dirección</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Servicio</th>
                            <th>Categoría</th>
                            <th>Repuesto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => {
                            const tecnico = tecnicos.find(t => t.cedula === cita.tecnico);
                            const cliente = clients.find(t => t.cedula === cita.cliente);
                            return (
                                <tr key={cita._id}>
                                    <td>{cita.cliente?.nombre} {cita.cliente?.apellido}</td>
                                    <td>{cita.tecnico ? `${cita.tecnico.nombre} ${cita.tecnico.apellido}` : "No disponible"}</td>
                                    <td>{cita.cliente?.direccion}</td>
                                    <td>
                                        {cita.fecha ? new Date(cita.fecha).toLocaleDateString('es-ES', {
                                            timeZone: 'America/Bogota',
                                        }) : "Fecha no disponible"}
                                    </td>
                                    <td>{cita.horaInicio} - {cita.horaFin}</td>
                                    <td>{cita.servicio?.tipo || "No disponible"}</td>
                                    <td>{cita.categoria?.tipo || "No disponible"}</td>
                                    <td>
                                        <button onClick={() => mostrarModal(cita.repuestos)} className="btn btn-info">
                                            <i className="fas fa-eye"></i> Ver
                                        </button>
                                    </td>
                                    <td>
                                        <select value={cita.estado} onChange={(e) => cambiarEstado(cita._id, e.target.value)}>
                                            <option value="Cargado">Cargado</option>
                                            <option value="Activado">Activado</option>
                                            <option value="No activado">No activado</option>
                                            <option value="Asignado">Asignado</option>
                                            <option value="Procesando">Procesando</option>
                                            <option value="Finalizado">Finalizado</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Link to={`/citas/editar/${cita._id}`} className="btn btn-azul">Editar</Link>
                                        <button
                                            type="button"
                                            className="btn btn-rojo btn-eliminar"
                                            onClick={() => eliminarCita(cita._id)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No hay citas disponibles</p>
            )}

            {repuestoSeleccionado && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={cerrarModal}>&times;</span>
                        <h2>Repuestos</h2>
                        {repuestoSeleccionado.length > 0 ? (
                            repuestoSeleccionado.map((repuesto, index) => (
                                <div key={index}>
                                    <p>Nombre: {repuesto.nombre}</p>
                                    <p>Cantidad: {repuesto.cantidad}</p>
                                    <p>Precio unitario: {repuesto.precio}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay repuestos disponibles.</p>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default CitasList;
