import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevaCategoria() {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [categoria, guardarCategoria] = useState({
        tipo: "", 
    });

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
        console.log(categoria);
    };

    // Añade en la REST API (backend) una categoría nueva
    const agregarCategoria = e => {
        e.preventDefault();
        clienteAxios.post('/categorias', categoria)
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
                        'Se agregó la Categoría',
                        res.data.mensaje,
                        "success"
                    );
                }
                // redireccionar 
                navigate('/categorias'); 
            });
    };

    // Validar formulario
    const validarCategoria = () => {
        const { tipo } = categoria;
        // Revisar que la propiedad del state tenga contenido
        return !tipo.length;
    };

    return (
        <Fragment>
            <h2>Nueva Categoría</h2>
            <form onSubmit={agregarCategoria}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Tipo:</label>
                    <input
                        type="text"
                        placeholder="Nombre de la Categoría"
                        name="tipo"
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Categoría"
                        disabled={validarCategoria()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevaCategoria;