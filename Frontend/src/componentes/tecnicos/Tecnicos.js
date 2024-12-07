import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Tecnico from "./Tecnico";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importar la extensión para tablas
import useTechnicalsStore from "../../store/useTechnicals.store";
import Modal from "../../Modal";
import NuevoTecnico from "./NuevoTecnico";

function Tecnicos() {
    const [busqueda, guardarBusqueda] = useState("");
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [tecnicosPorPagina] = useState(5);
    const { fetchTechnicals, technicals } = useTechnicalsStore();
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    const abrirModal = () => {
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalVisible(false);
    };
    useEffect(() => {
        fetchTechnicals();
    }, [fetchTechnicals]);
    console.log({ technicals })
    // Filtrar los técnicos por el término de búsqueda
    const tecnicosFiltrados = (technicals || []).filter(tecnico =>
        tecnico.nombre && tecnico.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    // Calcular la paginación
    const indiceUltimoTecnico = paginaActual * tecnicosPorPagina;
    const indicePrimerTecnico = indiceUltimoTecnico - tecnicosPorPagina;
    const tecnicosPaginados = tecnicosFiltrados.slice(indicePrimerTecnico, indiceUltimoTecnico);

    const cambiarPagina = numero => {
        guardarPaginaActual(numero);
    };

    const totalPaginas = Math.ceil(tecnicosFiltrados.length / tecnicosPorPagina);

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
            "Cliente", "Tipo documento", "Documento", "Email", "Teléfono", "Estado"
        ];

        const filas = technicals.map(tecnico => {
            return [
                tecnico.nombre,
                tecnico.apellido,
                tecnico.tipoDocumento,
                tecnico.cedula,
                tecnico.email,
                tecnico.telefono,
                tecnico.activo ? "Activo" : "Inactivo" // Verifica que 'activo' sea booleano
            ];
        });

        doc.autoTable({
            head: [columnas],
            body: filas,
        });

        doc.save("tecnicos.pdf");
    };

    return (
        <Fragment>
            <h2>Gestión de Técnicos</h2>

            <Link to="#" onClick={abrirModal} className="btn btn-verde nvo-tecnico">
                <i className="fas fa-plus-circle"></i>
                Nuevo Técnico
            </Link>

            {/* Mostrar el Modal si modalVisible es true */}
            {modalVisible && (
                <Modal cerrarModal={cerrarModal} titulo="Nuevo Técnico">
                    <NuevoTecnico cerrarModal={cerrarModal} />
                </Modal>
            )}
            {/* Botón para exportar PDF */}
            <button onClick={exportarPDF} className="btn btn-pdf">
                <i className="fas fa-file-pdf"></i> {/* Icono de PDF */}
            </button>

            {/* Barra de búsqueda */}
            <div className="barra-busqueda">
                <input
                    type="text"
                    className="busqueda"
                    placeholder="Buscar técnicos..."
                    value={busqueda}
                    onChange={e => {
                        guardarBusqueda(e.target.value);
                        guardarPaginaActual(1); // Reiniciar a la primera página
                    }}
                />
                <i className="fas fa-search lupa-icono"></i> {/* Icono de lupa */}
            </div>

            {/* Tabla de técnicos */}
            {tecnicosPaginados.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Tipo documento</th>
                            <th>Cedula</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tecnicosPaginados.map(tecnico => (
                            <Tecnico
                                key={tecnico._id}
                                tecnico={tecnico}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay técnicos disponibles</p>
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

export default Tecnicos;
