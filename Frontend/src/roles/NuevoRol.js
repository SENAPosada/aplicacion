import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';

function NuevoRol({ cerrarModal }) {
    const [rol, setRol] = useState({
        nombre: '',
        permisos: [],
    });

    const navigate = useNavigate();

    // Lista de componentes con las acciones CRUD para cada uno
    const componentes = [
        {
            id: "clientes",
            nombre: "Clientes",
            acciones: ["verClientes", "crearClientes", "actualizarClientes", "eliminarClientes"]
        },
        {
            id: "tecnicos",
            nombre: "Técnicos",
            acciones: ["verTecnicos", "crearTecnicos", "actualizarTecnicos", "eliminarTecnicos"]
        },
        {
            id: "repuestos",
            nombre: "Repuestos",
            acciones: ["verRepuestos", "crearRepuestos", "actualizarRepuestos", "eliminarRepuestos"]
        },
        {
            id: "servicios",
            nombre: "Servicios",
            acciones: ["verServicios", "crearServicios", "actualizarServicios", "eliminarServicios"]
        },
        {
            id: "citas",
            nombre: "Citas",
            acciones: ["verCitas", "crearCitas", "actualizarCitas", "eliminarCitas"]
        },
        {
            id: "ventas",
            nombre: "Ventas",
            acciones: ["verVentas", "crearVentas", "actualizarVentas", "eliminarVentas"]
        },
        {
            id: "usuarios",
            nombre: "Usuarios",
            acciones: ["verUsuarios", "crearUsuarios", "actualizarUsuarios", "eliminarUsuarios"]
        },
        {
            id: "roles",
            nombre: "Roles",
            acciones: ["verRoles", "crearRoles", "actualizarRoles", "eliminarRoles"]
        }
    ];

    // Estado para manejar la selección del componente y las acciones
    const [selectedComponent, setSelectedComponent] = useState('');
    const [selectedActions, setSelectedActions] = useState([]);

    // Función para manejar el cambio en la selección del componente
    const handleComponentChange = (e) => {
        const componentId = e.target.value;
        setSelectedComponent(componentId);
        setSelectedActions([]); // Limpiar las acciones seleccionadas cuando se cambia el componente
    };

    // Función para manejar la selección de los checkboxes
    const handleActionChange = (e) => {
        const action = e.target.value;
        setSelectedActions((prevSelected) =>
            prevSelected.includes(action)
                ? prevSelected.filter((item) => item !== action)
                : [...prevSelected, action]
        );
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combina los permisos seleccionados con el rol
        const rolData = {
            nombre: rol.nombre,
            permisos: selectedActions,
        };

        try {
            const respuesta = await clienteAxios.post('/roles', rolData);

            // Si la respuesta es exitosa, mostrar un mensaje de éxito y cerrar el modal
            Swal.fire({
                icon: 'success',
                title: 'Rol creado',
                text: respuesta.data.mensaje,
            });

            // Redirigir al listado de roles o cualquier página que desees
            navigate('/roles');
            cerrarModal();
        } catch (error) {
            // Si hay un error, mostrar un mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear el rol',
            });
        }
    };

    return (
        <div className="formulario-rol">
            <h2>Nuevo Rol</h2>
            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del rol"
                        value={rol.nombre}
                        onChange={(e) => setRol({ ...rol, nombre: e.target.value })}
                    />
                </div>

                <div className="campo">
                    <label>Selecciona un componente:</label>
                    <select onChange={handleComponentChange} value={selectedComponent}>
                        <option value="">-- Selecciona --</option>
                        {componentes.map((componente) => (
                            <option key={componente.id} value={componente.id}>
                                {componente.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedComponent && (
                    <div className="campo">
                        <label>Permisos:</label>
                        <div>
                            {componentes
                                .find((componente) => componente.id === selectedComponent)
                                ?.acciones.map((accion) => (
                                    <div key={accion}>
                                        <input
                                            type="checkbox"
                                            value={accion}
                                            checked={selectedActions.includes(accion)}
                                            onChange={handleActionChange}
                                        />
                                        <label>{accion}</label>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                <div className="enviar">
                    <input type="submit" value="Crear Rol" />
                </div>
            </form>
        </div>
    );
}

export default NuevoRol;
