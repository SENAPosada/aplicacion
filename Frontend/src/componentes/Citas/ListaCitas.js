import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function CitasList() {
    const [citas, setCitas] = useState([]);
    const [tecnicos, setTecnicos] = useState([]); // Agregar estado para técnicos

    useEffect(() => {
        const fetchCitas = async () => {
            const response = await clienteAxios.get('/citas');
            setCitas(response.data);
            console.log({citas})
        };

        const fetchTecnicos = async () => {
            const response = await clienteAxios.get('/tecnicos'); // Asegúrate de que esta ruta sea correcta
            setTecnicos(response.data);
        };

        fetchCitas();
        fetchTecnicos();
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
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/citas/${idCita}`)
                    .then(res => {
                        Swal.fire("¡Eliminado!", res.data.mensaje, "success");
                        // Actualizar la lista de citas
                        setCitas(citas.filter(cita => cita._id !== idCita));
                    })
                    .catch(error => {
                        Swal.fire("Error", "No se pudo eliminar la cita", "error");
                    });
            }
        });
    };

    const cambiarEstado = (idCita, nuevoEstado) => {
        clienteAxios.put(`/citas/${idCita}`, { estado: nuevoEstado })
            .then(res => {
                Swal.fire("¡Estado Actualizado!", res.data.mensaje, "success");
                setCitas(citas.map(cita => cita._id === idCita ? { ...cita, estado: nuevoEstado } : cita));
            })
            .catch(error => {
                Swal.fire("Error", "No se pudo actualizar el estado de la cita", "error");
            });
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
                            <th>Ciudad</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => {
                            // Encuentra el técnico correspondiente utilizando la cédula
                            const tecnico = tecnicos.find(t => t.cedula === cita.tecnico);
                            console.log(`Cita ID: ${cita._id}, Horario: ${cita.horario}`);
                            return (
                                <tr key={cita._id}>
                                    <td>{cita.cliente}</td>
                                    <td>{tecnico ? `${tecnico.nombre} ${tecnico.apellido}` : 'No disponible'}</td>
                                    <td>{cita.direccion}</td>
                                    <td>{cita.ciudad}</td>
                                    <td>{cita.fecha ? new Date(cita.fecha).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'Fecha no disponible'}</td>
                                    <td>{cita.horario}</td>
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
                                        <Link to={`/citas/editar/${cita._id}`} className="btn btn-azul">
                                            Editar
                                        </Link>
                                        {/* Botón para eliminar la cita */}
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
        </Fragment>
    );
}

export default CitasList;
