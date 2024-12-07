// Clientes.js
import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importar la extensión para tablas
import Modal from "../../Modal";
import NuevoCliente from "./NuevoCliente";
function Clientes() {
    const [clientes, guardarClientes] = useState([]);
    const [busqueda, guardarBusqueda] = useState("");
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [clientesPorPagina] = useState(5);
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    const consultarAPI = async () => {
        try {
            const clientesConsulta = await clienteAxios.get("/clientes");
            guardarClientes(clientesConsulta.data);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    // Función para abrir el modal
    const abrirModal = () => {
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalVisible(false);
    };

    // Filtrar los clientes por el término de búsqueda
    const clientesFiltrados = (clientes || []).filter(cliente =>
        cliente.nombre && cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    

    // Calcular la paginación
    const indiceUltimoCliente = paginaActual * clientesPorPagina;
    const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
    const clientesPaginados = clientesFiltrados.slice(indicePrimerCliente, indiceUltimoCliente);

    const cambiarPagina = numero => {
        guardarPaginaActual(numero);
    };

    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

    // Funciones para navegar entre las páginas
    const irAnterior = () => {
        if (paginaActual > 1) {
            guardarPaginaActual(paginaActual - 1);
        }
    };

    const irSiguiente = () => {
        if (paginaActual < totalPaginas) {
            guardarPaginaActual(paginaActual + 1);
        }
    };

    // Función para exportar a PDF
    const exportarPDF = () => {
        const doc = new jsPDF();

        const columnas = [
            "Nombres", "Apellidos", "Tipo documento", "Documento", "Email", "Teléfono", "Estado"
        ];

        const filas = clientes.map(cliente => {
            return [
                cliente.nombre,
                cliente.apellido,
                cliente.tipoDocumento,
                cliente.cedula,
                cliente.email,
                cliente.telefono,
                cliente.activo ? "Activo" : "Inactivo" // Verifica que 'activo' sea booleano
            ];
        });

        doc.autoTable({
            head: [columnas],
            body: filas,
        });

        doc.save("clientes.pdf");
    };

    return (
        <Fragment>
            <h2>Gestión de Clientes</h2>

            <Link to="#" onClick={abrirModal} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            {/* Mostrar el Modal si modalVisible es true */}
            {modalVisible && (
                <Modal cerrarModal={cerrarModal} titulo="Nuevo Cliente">
                    <NuevoCliente cerrarModal={cerrarModal} />
                </Modal>
            )}

            {/* Botón para exportar PDF */}
            <button onClick={exportarPDF} className="btn btn-pdf">
                <i className="fas fa-file-pdf"></i> {/* Icono de PDF */}
            </button>

            {/* Contenedor para la barra de búsqueda */}
            <div className="barra-busqueda">
                <input
                    type="text"
                    className="busqueda"
                    placeholder="Buscar clientes..."
                    value={busqueda}
                    onChange={e => {
                        guardarBusqueda(e.target.value);
                        guardarPaginaActual(1); // Reiniciar a la primera página porque al hacer click en la pagina 2 y buscar no servia
                    }}
                />
                <i className="fas fa-search lupa-icono"></i> {/* Icono de lupa */}
            </div>

            {/* Tabla de clientes */}
            {clientesPaginados.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Tipo documento</th>
                            <th>Documento</th>
                            <th>Empresa</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesPaginados.map(cliente => (
                            <Cliente
                                key={cliente._id}
                                cliente={cliente}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay clientes para mostrar</p>
            )}

            {/* Paginación */}
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button
                        className="btn-paginacion"
                        onClick={irAnterior}
                        disabled={paginaActual === 1} // Desactiva el botón si es la primera página
                    >
                        <i className="fas fa-chevron-left"></i> {/* Icono de anterior */}
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`btn-paginacion ${paginaActual === i + 1 ? "activo" : ""}`}
                            onClick={() => cambiarPagina(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="btn-paginacion"
                        onClick={irSiguiente}
                        disabled={paginaActual === totalPaginas} // Desactiva el botón si es la última página
                    >
                        <i className="fas fa-chevron-right"></i> {/* Icono de siguiente */}
                    </button>
                </div>
            )}
        </Fragment>
    );
}

export default Clientes;
