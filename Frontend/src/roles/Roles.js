import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from '../config/axios';
import Rol from "./Rol";
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "../Modal";
import NuevoRol from "./NuevoRol";

function Roles() {
    const [roles, guardarRoles] = useState([]);
    const [busqueda, guardarBusqueda] = useState("");
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [rolesPorPagina] = useState(5);
    const [modalVisible, setModalVisible] = useState(false);

    const consultarAPI = async () => {
        try {
            const rolesConsulta = await clienteAxios.get("/roles");
            guardarRoles(rolesConsulta.data);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const abrirModal = () => {
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const rolesFiltrados = roles.filter(rol =>
        rol.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const indiceUltimoRol = paginaActual * rolesPorPagina;
    const indicePrimerRol = indiceUltimoRol - rolesPorPagina;
    const rolesPaginados = rolesFiltrados.slice(indicePrimerRol, indiceUltimoRol);

    const cambiarPagina = numero => {
        guardarPaginaActual(numero);
    };

    const totalPaginas = Math.ceil(rolesFiltrados.length / rolesPorPagina);

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

    const exportarPDF = () => {
        const doc = new jsPDF();

        const columnas = [
            "Nombre", "Descripción", "Estado"
        ];

        const filas = roles.map(rol => {
            return [
                rol.nombre,
                rol.descripcion,
                rol.activo ? "Activo" : "Inactivo"
            ];
        });

        doc.autoTable({
            head: [columnas],
            body: filas,
        });

        doc.save("roles.pdf");
    };

    return (
        <Fragment>
            <h2>Gestión de Roles</h2>

            <Link to="#" onClick={abrirModal} className="btn btn-verde nvo-rol">
                <i className="fas fa-plus-circle"></i>
                Nuevo Rol
            </Link>

            {modalVisible && (
                <Modal cerrarModal={cerrarModal} titulo="Nuevo Rol">
                    <NuevoRol cerrarModal={cerrarModal} />
                </Modal>
            )}

            <button onClick={exportarPDF} className="btn btn-pdf">
                <i className="fas fa-file-pdf"></i>
            </button>

            <div className="barra-busqueda">
                <input
                    type="text"
                    className="busqueda"
                    placeholder="Buscar roles..."
                    value={busqueda}
                    onChange={e => {
                        guardarBusqueda(e.target.value);
                        guardarPaginaActual(1);
                    }}
                />
                <i className="fas fa-search lupa-icono"></i>
            </div>

            {rolesPaginados.length > 0 ? (
                <table className="tabla-roles">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolesPaginados.map(rol => (
                            <Rol key={rol._id} rol={rol} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay roles para mostrar</p>
            )}

            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button
                        className="btn-paginacion"
                        onClick={irAnterior}
                        disabled={paginaActual === 1}
                    >
                        <i className="fas fa-chevron-left"></i>
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
                        disabled={paginaActual === totalPaginas}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </Fragment>
    );
}

export default Roles;
