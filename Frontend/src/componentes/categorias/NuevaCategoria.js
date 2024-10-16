import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevaCategoria() {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [categoria, guardarCategoria] = useState({
        tipo: "", 
        servicio: "" // Añadimos el campo servicio
    });

    const [servicios, setServicios] = useState([]); // Estado para almacenar los servicios

    // Obtener los servicios desde la API cuando el componente cargue
    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const respuesta = await clienteAxios.get('/servicios'); // Asegúrate que esta ruta esté en tu backend
                setServicios(respuesta.data);
                console.log({servicios})
                console.log({respuesta})
            } catch (error) {
                console.log(error);
            }
        };
        obtenerServicios();
    }, []);

    // Leer datos del formulario
    const handleChange = e => {
        guardarCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    };

    // Añade en la REST API una categoría nueva
    const agregarCategoria = e => {
        e.preventDefault();
        clienteAxios.post('/categorias', categoria)
            .then(res => {
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
                navigate('/categorias'); 
            });
    };

    // Validar formulario
    const validarCategoria = () => {
        const { tipo, servicio } = categoria;
        return !tipo.length || !servicio.length;
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

                <div className="campo">
                    <label>Seleccionar Servicio:</label>
                    <select
                        name="servicio"
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un servicio</option>
                        {servicios.map(servicio => (
                            <option key={servicio._id} value={servicio._id}>
                                {servicio.tipo}
                            </option>
                        ))}
                    </select>
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
