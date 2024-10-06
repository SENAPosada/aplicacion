import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '../layout/Spinner';

function EditarRepuesto() { // Cambiar a EditarRepuesto
    // Hook para redireccionar
    const navigate = useNavigate();

    // Usar el hook useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();

    const [repuesto, guardarRepuesto] = useState({ // Cambiar a repuesto
        // objeto
        nombre: "",
        precio: "",
        descripcion: "", // Añadir el campo descripción
        imagen: ''
    });

    // En caso de que alguien quiera cambiar la foto
    const [archivo, guardarArchivo] = useState('');

    useEffect(() => {
        // consultar la API para traer el repuesto a editar
        const consultarAPI = async () => {
            const repuestoConsulta = await clienteAxios.get(`/repuestos/${id}`); // Cambiar a /repuestos
            // guardar en el state
            console.log("repuestoConsulta.data: ", repuestoConsulta.data);
            guardarRepuesto(repuestoConsulta.data); // Cambiar a guardarRepuesto
        }
        consultarAPI();
    }, [id]); // Asegúrate de incluir id como dependencia

    // Edita un repuesto en la base de datos
    const EditarRepuesto = async e => { // Cambiar a EditarRepuesto
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', repuesto.nombre); // Cambiar a repuesto
        formData.append('precio', repuesto.precio); // Cambiar a repuesto
        formData.append('descripcion', repuesto.descripcion); // Añadir descripción
        formData.append('imagen', archivo);

        // Almacenar en la base de datos
        try {
            const res = await clienteAxios.put(`/repuestos/${id}`, formData, { // Cambiar a /repuestos
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                Swal.fire(
                    'Editado correctamente',
                    res.data.mensaje,
                    'success'
                );
            }
            // Redireccionar a repuestos
            navigate('/repuestos'); // Cambiar a /repuestos
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            });
        }
    }

    const leerInformacionRepuesto = e => { // Cambiar a leerInformacionRepuesto
        guardarRepuesto({ // Cambiar a guardarRepuesto
            ...repuesto,
            [e.target.name]: e.target.value
        });
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    }

    // Extraer los valores del state
    const { nombre, precio, descripcion, imagen } = repuesto; // Cambiar a repuesto

    // Si aún no ha cargado
    if (!nombre) return <Spinner />;

    return (
        <Fragment>
            <h2>Editar Repuesto</h2> {/* Cambiar a Editar Repuesto */}
            <form onSubmit={EditarRepuesto}> {/* Cambiar a EditarRepuesto */}
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Repuesto" // Cambiar a Nombre Repuesto
                        name="nombre"
                        onChange={leerInformacionRepuesto} // Cambiar a leerInformacionRepuesto
                        value={nombre}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        min="0.00"
                        step="0.01"
                        placeholder="Precio"
                        onChange={leerInformacionRepuesto} // Cambiar a leerInformacionRepuesto
                        value={precio}
                    />
                </div>
                
                <div className="campo">
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        placeholder="Descripción del Repuesto" // Cambiar a Descripción del Repuesto
                        onChange={leerInformacionRepuesto} // Cambiar a leerInformacionRepuesto
                        value={descripcion}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt="Imagen"
                            width="300" />
                    ) : null}
                    <input
                        type="file"
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Repuesto" /> {/* Cambiar a Editar Repuesto */}
                </div>
            </form>
        </Fragment>
    );
}

export default EditarRepuesto; // Cambiar a EditarRepuesto
