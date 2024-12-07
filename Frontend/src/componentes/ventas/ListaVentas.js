import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import useClientsStore from "../../store/useClients.store";

function ListaVentas() {
    const [ventas, setVentas] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
    const [detalleVenta, setDetalleVenta] = useState({ subtotal: 0, iva: 0, total: 0 });
    const [repuestosSeleccionados, setRepuestosSeleccionados] = useState([]); // Modal para ver repuestos
    const { fetchClients, clients } = useClientsStore();

    useEffect(() => {
        const fetchVentas = async () => {
            const response = await clienteAxios.get("/ventas");
            setVentas(response.data);
        };

        const fetchTecnicos = async () => {
            const response = await clienteAxios.get("/tecnicos");
            setTecnicos(response.data);
        };

        fetchVentas();
        fetchTecnicos();
        fetchClients();
    }, []);

    const cambiarEstado = (idVenta, nuevoEstado) => {
        clienteAxios
            .put(`/ventas/${idVenta}`, { estado: nuevoEstado })
            .then((res) => {
                Swal.fire("¡Estado Actualizado!", res.data.mensaje, "success");
                setVentas(
                    ventas.map((venta) =>
                        venta._id === idVenta ? { ...venta, estado: nuevoEstado } : venta
                    )
                );
            })
            .catch(() => {
                Swal.fire("Error", "No se puede editar una venta finalizada", "error");
            });
    };

    const abrirModalRepuestos = (repuestos) => {
        setRepuestosSeleccionados(repuestos);
    };

    const cerrarModalRepuestos = () => {
        setRepuestosSeleccionados([]);
    };

    const abrirModalCrearVenta = (venta) => {
        setVentaSeleccionada({
            ...venta,
            repuestoNombre: venta.repuestos?.[0]?.nombre || "",
            repuestoCantidad: venta.repuestos?.[0]?.cantidad || 0,
            repuestoPrecio: venta.repuestos?.[0]?.precio || 0,
            precioServicio: venta.total || 0,
            iva: 19,
            anotaciones: "",
            estado: "Procesando",
        });

        calcularDetalleVenta(
            venta.repuestos?.[0]?.precio || 0,
            venta.repuestos?.[0]?.cantidad || 0,
            venta.total || 0,
            19
        );
    };

    const cerrarModalCrearVenta = () => {
        setVentaSeleccionada(null);
    };

    const calcularDetalleVenta = (precioRepuesto, cantidadRepuesto, precioServicio, iva) => {
        const subtotal = precioRepuesto * cantidadRepuesto + parseFloat(precioServicio || 0);
        const ivaCalculado = (subtotal * parseFloat(iva || 0)) / 100;
        const total = subtotal + ivaCalculado;

        setDetalleVenta({ subtotal, iva: ivaCalculado, total });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVentaSeleccionada((prev) => ({ ...prev, [name]: value }));

        if (name === "precioServicio" || name === "iva") {
            calcularDetalleVenta(
                ventaSeleccionada.repuestoPrecio,
                ventaSeleccionada.repuestoCantidad,
                name === "precioServicio" ? value : ventaSeleccionada.precioServicio,
                name === "iva" ? value : ventaSeleccionada.iva
            );
        }
    };

    const handleGuardarVenta = async () => {
        try {
            // Crea el objeto con los datos actualizados
            const datosActualizados = {
                cliente: ventaSeleccionada.cliente._id,
                tecnico: ventaSeleccionada.tecnico._id,
                repuestos: ventaSeleccionada.repuestos,
                servicio: ventaSeleccionada.servicio._id,
                categoria: {
                    ...ventaSeleccionada.categoria,
                    precio: ventaSeleccionada.precioCategoria || 0, // Incluye el nuevo campo "precio"
                },
                fecha: ventaSeleccionada.fecha,
                horario: ventaSeleccionada.horario,
                horaInicio: ventaSeleccionada.horaInicio,
                horaFin: ventaSeleccionada.horaFin,
                estado: ventaSeleccionada.estado,
                direccion: ventaSeleccionada.direccion,
                anotaciones: ventaSeleccionada.anotaciones,
                total: detalleVenta.total,
            };

            // Enviar datos actualizados al backend usando PUT
            const response = await clienteAxios.put(`/ventas/${ventaSeleccionada._id}`, datosActualizados);

            Swal.fire("¡Venta actualizada!", "Se han guardado los cambios correctamente.", "success");

            // Actualizar la lista de ventas en el frontend
            setVentas((prevVentas) =>
                prevVentas.map((venta) =>
                    venta._id === ventaSeleccionada._id ? { ...venta, ...response.data } : venta
                )
            );

            cerrarModalCrearVenta();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudieron guardar los cambios.", "error");
        }
    };


    return (
        <Fragment>
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
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => {
                        const tecnico = tecnicos.find((t) => t.cedula === venta.tecnico);
                        const cliente = clients.find((c) => c.cedula === venta.cliente);
                        return (
                            <tr key={venta._id}>
                                <td>{`${venta.cliente?.nombre || ""} ${venta.cliente?.apellido || ""}`}</td>
                                <td>{`${venta.tecnico?.nombre || ""} ${venta.tecnico?.apellido || ""}`}</td>
                                <td>{venta.direccion}</td>
                                <td>
                                    {venta.fecha
                                        ? new Date(venta.fecha).toLocaleDateString("es-ES")
                                        : "Fecha no disponible"}
                                </td>
                                <td>{venta.horaInicio} - {venta.horaFin}</td>
                                <td>{venta.servicio?.tipo || "No disponible"}</td>
                                <td>{venta.categoria?.tipo || "No disponible"}</td>
                                <td>
                                    <button
                                        onClick={() => abrirModalRepuestos(venta.repuestos)}
                                        className="btn btn-info"
                                    >
                                        Ver
                                    </button>
                                </td>
                                <td>{venta.total || "0"}</td>
                                <td>
                                    <select
                                        value={venta.estado}
                                        onChange={(e) => cambiarEstado(venta._id, e.target.value)}
                                    >
                                        <option value="Procesando">Procesando</option>
                                        <option value="En ruta">En ruta</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="Anulado">Anulado</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success custom-button"
                                        onClick={() => abrirModalCrearVenta(venta)}
                                        disabled={venta.estado === "Finalizado"}
                                        title={venta.estado === "Finalizado" ? "La venta ya está finalizada y no se puede editar." : ""}
                                    >
                                        Crear Venta
                                    </button>


                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {repuestosSeleccionados.length > 0 && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <h2>Detalles de Repuestos</h2>
                        <ul>
                            {repuestosSeleccionados.map((repuesto, index) => (
                                <li key={index}>
                                    <p><strong>Nombre:</strong> {repuesto.nombre}</p>
                                    <p><strong>Precio:</strong> ${repuesto.precio}</p>
                                    <p><strong>Cantidad:</strong> {repuesto.cantidad}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-primary" onClick={cerrarModalRepuestos}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {ventaSeleccionada && (
                <div className="modal-overlay">
                    <div className="modal-contenido modal-crear-venta">
                        <span className="close" onClick={cerrarModalCrearVenta}>
                            &times;
                        </span>
                        <h2>Nueva Venta</h2>
                        <div className="modal-grid">
                            {/* Información del Cliente */}
                            <div className="modal-seccion">
                                <h3>Información del Cliente</h3>
                                <p><strong>Cliente:</strong> {ventaSeleccionada.cliente?.nombre || ""} {ventaSeleccionada.cliente?.apellido || ""}</p>
                                <p><strong>Servicio:</strong> {ventaSeleccionada.servicio?.tipo || "No disponible"}</p>
                                <p><strong>Categoría:</strong> {ventaSeleccionada.categoria?.tipo || "No disponible"}</p>
                            </div>
                            {/* Detalle del Servicio */}
                            <div className="modal-seccion">
                                <h3>Detalle del Servicio</h3>
                                <p><strong>Repuesto:</strong> {ventaSeleccionada.repuestoNombre || "No disponible"}</p>
                                <p><strong>Cantidad:</strong> {ventaSeleccionada.repuestoCantidad || "0"}</p>
                                <p><strong>Precio unitario:</strong> ${ventaSeleccionada.repuestoPrecio || "0"}</p>
                                <p>
                                    <label>Precio del Servicio:</label>
                                    <input
                                        type="number"
                                        name="precioServicio"
                                        value={ventaSeleccionada.precioServicio}
                                        onChange={handleInputChange}
                                    />
                                </p>
                                <p>
                                    <label>IVA (%):</label>
                                    <input
                                        type="number"
                                        name="iva"
                                        value={ventaSeleccionada.iva}
                                        onChange={handleInputChange}
                                    />
                                </p>
                                <p>
                                    <label>Anotaciones:</label>
                                    <textarea
                                        name="anotaciones"
                                        value={ventaSeleccionada.anotaciones}
                                        onChange={handleInputChange}
                                        placeholder="Escribe aquí tus anotaciones..."
                                    />
                                </p>
                            </div>
                            {/* Resumen de la Venta */}
                            <div className="modal-seccion">
                                <h3>Resumen de la Venta</h3>
                                <p><strong>Subtotal:</strong> ${detalleVenta.subtotal.toFixed(2)}</p>
                                <p><strong>IVA:</strong> ${detalleVenta.iva.toFixed(2)}</p>
                                <p><strong>Total:</strong> ${detalleVenta.total.toFixed(2)}</p>
                                <p>
                                    <label>Estado:</label>
                                    <select
                                        name="estado"
                                        value={ventaSeleccionada.estado}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Procesando">Procesando</option>
                                        <option value="En ruta">En ruta</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="Anulado">Anulado</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleGuardarVenta}
                        >
                            Guardar Venta
                        </button>

                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ListaVentas;
