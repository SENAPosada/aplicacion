import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

// Componente para mostrar cada categoría individual
function Categoria({ categoria }) {
    // Extraer los valores de la categoría
    const { _id, tipo } = categoria;

    // Función para eliminar una categoría
    const eliminarCategoria = idCategoria => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una categoría eliminada no se puede recuperar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Llamar a la API para eliminar la categoría
                clienteAxios.delete(`/categorias/${ idCategoria }`)
                    .then(res => {
                        Swal.fire(
                            "¡Eliminado!",
                            res.data.mensaje,
                            "success"
                        );
                    })
                    .catch(error => {
                        Swal.fire(
                            "Error",
                            "No se pudo eliminar la categoría",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <Fragment>
            <tr>
                <td>{tipo}</td>
                <td>
                    {/* Editar una categoría con un id específico */}
                    <Link to={`/categorias/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>

                </Link>

                {/* Botón para eliminar la categoría */}
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCategoria(_id)}
                >
                    <i className="fas fa-times"></i>

                </button>
            </td>
        </tr>
        </Fragment >
    );
}

export default Categoria;