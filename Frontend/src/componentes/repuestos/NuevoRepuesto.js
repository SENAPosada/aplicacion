import React, { useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from "react-router-dom";

function NuevoRepuesto({cerrarModale}) { // Cambiar a NuevoRepuesto
    const navigate = useNavigate();

    const [repuesto, guardarRepuesto] = useState({ // Cambiar a repuesto
        nombre: '',
        precio: '',
        descripcion: '' // Nuevo campo para la descripción
    });

    const [archivo, guardarArchivo] = useState('');

    const agregarRepuesto = async e => { // Cambiar a agregarRepuesto
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', repuesto.nombre); // Cambiar a repuesto
        formData.append('precio', repuesto.precio); // Cambiar a repuesto
        formData.append('descripcion', repuesto.descripcion); // Agregar descripción

        if (archivo) {
            formData.append('imagen', archivo);
        }

        try {
            const res = await clienteAxios.post('/repuestos', formData, { // Cambiar a /repuestos
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                Swal.fire(
                    'Agregado correctamente',
                    res.data.mensaje,
                    'success'
                );
            }
            cerrarModale()
            navigate('/repuestos'); // Cambiar a /repuestos
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            });
        }
    };

    const leerInformacionRepuesto = e => { // Cambiar a leerInformacionRepuesto
        guardarRepuesto({ // Cambiar a guardarRepuesto
            ...repuesto,
            [e.target.name]: e.target.value
        });
    };

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    };

    return (
        <Fragment>
            <form onSubmit={agregarRepuesto}> {/* Cambiar a agregarRepuesto */}
                <legend>Crear repuesto</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Repuesto" // Cambiar a Nombre Repuesto
                        name="nombre"
                        onChange={leerInformacionRepuesto} // Cambiar a leerInformacionRepuesto
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
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea
                        placeholder="Descripción del Repuesto" // Cambiar a Descripción del Repuesto
                        name="descripcion"
                        onChange={leerInformacionRepuesto} // Cambiar a leerInformacionRepuesto
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Repuesto" /> {/* Cambiar a Agregar Repuesto */}
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoRepuesto; // Cambiar a NuevoRepuesto
