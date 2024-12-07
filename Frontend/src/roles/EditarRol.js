import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

function EditarRol() {
    // Hook para redireccionar
    const navigate = useNavigate();

    // Usar el hook useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();

    // Estado para el rol
    const [rol, setRol] = useState({
        name: "",
        description: "",
    });

    // Consultar API para obtener el rol a editar
    const consultarAPI = async () => {
        try {
            const respuesta = await clienteAxios.get(`/roles/${id}`);
            setRol(respuesta.data);
        } catch (error) {
            console.error("Error al consultar el rol:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo cargar el rol",
            });
        }
    };

    // Actualizar rol en la API
    const actualizarRol = async (e) => {
        e.preventDefault();
        try {
            await clienteAxios.put(`/roles/${rol._id}`, rol);
            Swal.fire("Correcto", "El rol se actualizó correctamente", "success");
            navigate("/roles");
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el rol",
            });
        }
    };

    // Leer datos del formulario
    const handleChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value,
        });
    };

    // Validar formulario
    const validarRol = () => {
        const { name, description } = rol;
        return !name.length || !description.length;
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Editar Rol</h2>
            <form onSubmit={actualizarRol}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Rol"
                        onChange={handleChange}
                        value={rol.name}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción del Rol"
                        onChange={handleChange}
                        value={rol.description}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarRol()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarRol;
