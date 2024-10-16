import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function CitasList() {
    const [citas, setCitas] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null); // Estado para el modal de repuestos

    useEffect(() => {
        const fetchCitas = async () => {
            const response = await clienteAxios.get('/citas');
            setCitas(response.data);
            
        };

        const fetchTecnicos = async () => {
            const response = await clienteAxios.get('/tecnicos');
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
                            <th>Ciudad</th>
                            <th>Fecha</th>
                            <th>Horario</th> {/* Nueva columna */}
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
                            return (
                                <tr key={cita._id}>
                                    <td>{cita.cliente ? `${cita.cliente.nombre} ${cita.cliente.apellido}` : 'No disponible'}</td>

                                    <td>{tecnico ? `${tecnico.nombre} ${tecnico.apellido}` : 'No disponible'}</td>
                                    <td>{cita.direccion}</td>
                                    <td>{cita.ciudad}</td>
                                    <td>
                                        {cita.fecha ?
                                            new Date(cita.fecha).toLocaleDateString('es-ES', {
                                                timeZone: 'America/Bogota', // Cambia esto según tu zona horaria
                                            }) : 'Fecha no disponible'}
                                    </td>
                                    <td>{cita.horaInicio} - {cita.horaFin}</td>
                                    <td>{cita.servicio ? cita.servicio.tipo : 'No disponible'}</td>
                                    <td>{cita.categoria ? cita.categoria.tipo : 'No disponible'}</td>
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
                                        <Link to={`/citas/editar/${cita._id}`} className="btn btn-azul">
                                            Editar
                                        </Link>
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
