import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

function Repuesto({ repuesto, mostrarModal }) { // Cambiar a Repuesto
    const { _id, nombre, precio } = repuesto; // Cambiar a repuesto

    const eliminarRepuesto = (id) => { // Cambiar a eliminarRepuesto
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Un repuesto eliminado no se puede recuperar!", // Cambiar a repuesto
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "No, Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/repuestos/${id}`) // Cambiar a /repuestos
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                "Eliminado",
                                res.data.mensaje,
                                "success"
                            );
                        }
                    });
            }
        });
    };

    return (
        <Fragment>
            <tr className="repuesto"> {/* Cambiar a repuesto */}
                <td>{nombre}</td>
                <td>{precio}</td>
                <td>
                    <button onClick={() => mostrarModal(repuesto)} className="btn btn-info">
                        <i className="fas fa-eye"></i> Ver
                    </button>

                    <Link to={`/repuestos/editar/${_id}`} className="btn btn-azul ml-2"> {/* Cambiar a /repuestos */}
                        <i className="fas fa-pen-alt"></i> 
                    </Link>

                    <button
                        type="button"
                        className="btn btn-rojo btn-eliminar ml-2"
                        onClick={() => eliminarRepuesto(_id)} // Cambiar a eliminarRepuesto
                    >
                        <i className="fas fa-times"></i> 
                    </button>
                </td>
            </tr>
        </Fragment>
    );
}

export default Repuesto; // Cambiar a Repuesto
