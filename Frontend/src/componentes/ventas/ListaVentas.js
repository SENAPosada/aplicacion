import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useClientsStore from "../../store/useClients.store";
function ListaVentas() {
    const [ventas, setVentas] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null); // Estado para el modal de repuestos
    const { fetchClients, clients } = useClientsStore();
    useEffect(() => {
        const fetchVentas = async () => {
            const response = await clienteAxios.get('/ventas');
            setVentas(response.data);
        };

        const fetchTecnicos = async () => {
            const response = await clienteAxios.get('/tecnicos');
            setTecnicos(response.data);
        };

        fetchVentas();
        fetchTecnicos();
        fetchClients();
    }, []);

    const cambiarEstado = (idVenta, nuevoEstado) => {
        clienteAxios.put(`/ventas/${idVenta}`, { estado: nuevoEstado })
            .then(res => {
                Swal.fire("¡Estado Actualizado!", res.data.mensaje, "success");
                setVentas(ventas.map(venta => venta._id === idVenta ? { ...venta, estado: nuevoEstado } : venta));
            })
            .catch(error => {
                Swal.fire("Error", "No se pudo actualizar el estado de la venta", "error");
            });
    };

    const mostrarModal = (repuestos) => {
        setRepuestoSeleccionado(repuestos);
    };

    const cerrarModal = () => {
        setRepuestoSeleccionado(null);
    };

    // Función para calcular el total de la venta
    const calcularTotalVenta = (venta) => {
        let totalRepuestos = 0;

        // Calcular el total de los repuestos (precio * cantidad)
        if (venta.repuestos && venta.repuestos.length > 0) {
            totalRepuestos = venta.repuestos.reduce((total, repuesto) => {
                return total + repuesto.precio * repuesto.cantidad;
            }, 0);
        }

        // Sumar el precio de la categoría (si está disponible)
        const totalCategoria = venta.categoria && venta.categoria.precio ? venta.categoria.precio : 0;

        // Retornar el total (repuestos + categoría)
        return totalRepuestos + totalCategoria;
    };

    return (
        <Fragment>
            {ventas.length > 0 ? (
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
                            <th>Total</th> {/* Nueva columna para el total */}
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => {
                            const tecnico = tecnicos.find(t => t.cedula === venta.tecnico);
                            const totalVenta = calcularTotalVenta(venta); // Calcular el total de la venta
                            const cliente = clients.find(t => t.cedula === venta.cliente);
                            return (
                                <tr key={venta._id}>
                                    <td>{cliente.nombre} {cliente.apellido}</td>
                                    <td>{tecnico ? `${tecnico.nombre} ${tecnico.apellido}` : 'No disponible'}</td>
                                    <td>{venta.direccion}</td>
                                    <td>{venta.ciudad}</td>
                                    <td>
                                        {venta.fecha ?
                                            new Date(venta.fecha).toLocaleDateString('es-ES', {
                                                timeZone: 'America/Bogota', 
                                            }) : 'Fecha no disponible'}
                                    </td>
                                    <td>{venta.horaInicio} - {venta.horaFin}</td>
                                    <td>{venta.servicio ? venta.servicio.tipo : 'No disponible'}</td>
                                    <td>{venta.categoria ? venta.categoria.tipo : 'No disponible'}</td>
                                    <td>
                                        <button onClick={() => mostrarModal(venta.repuestos)} className="btn btn-info">
                                            <i className="fas fa-eye"></i> Ver
                                        </button>
                                    </td>
                                    <td>{totalVenta}</td> {/* Mostrar el total calculado */}
                                    <td>
                                        <select value={venta.estado} onChange={(e) => cambiarEstado(venta._id, e.target.value)}>
                                            <option value="Procesando">Procesando</option>
                                            <option value="En ruta">En ruta</option>
                                            <option value="Entregado">Entregado</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Link to={`/ventas/nueva/${venta._id}`} className="btn btn-azul">
                                            AGREGAR PRECIO FINAL
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No hay ventas disponibles</p>
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
                                    <p>Precio: {repuesto.precio}</p>
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

export default ListaVentas;
