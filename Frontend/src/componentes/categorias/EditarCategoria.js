import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function EditarCategoria() {
    // Hook para redireccionar
    const navigate = useNavigate();

    // Usar el hook useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();

    const [categoria, datosCategoria] = useState({
        // objeto
        tipo: "", // Solo una propiedad para la categoría
    });

    const consultarAPI = async () => {
        const categoriaConsulta = await clienteAxios.get(`/categorias/${id}`);
        // guardar en el state
        console.log("categoriaConsulta.data: ", categoriaConsulta.data);
        datosCategoria(categoriaConsulta.data);
    };

    // Envío de petición para actualizar categoría
    const actualizarCategoria = e => {
        e.preventDefault();
        clienteAxios.put(`/categorias/${categoria._id}`, categoria)
            .then(res => {
                // Validar si hay errores de mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'La categoría ya está registrada'
                    });
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        "success"
                    );
                }
                // Redireccionar a la página de categorías
                navigate('/categorias');
            });
    };

    // useEffect, cuando el componente carga
    useEffect(() => {
        consultarAPI();
    }, []);

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        datosCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
        console.log(categoria);
    };

    // Validar formulario
    const validarCategoria = () => {
        const { tipo } = categoria;
        // Revisar que la propiedad del state tenga contenido
        return !tipo.length;
    };

    return (
        <Fragment>
            <h2>Editar Categoría</h2>
            <form onSubmit={actualizarCategoria}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Tipo:</label>
                    <input
                        type="text"
                        placeholder="Nombre de la Categoría"
                        name="tipo"
                        onChange={handleChange}
                        value={categoria.tipo}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarCategoria()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarCategoria;