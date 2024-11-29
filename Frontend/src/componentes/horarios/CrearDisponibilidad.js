import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const CrearDisponibilidad = ({ onCrear }) => {
    const navigate = useNavigate();
    const [numTurnos, setNumTurnos] = useState(1); // Para determinar cuántos turnos crear
    const [horarios, setHorarios] = useState([{ horaInicio: '', horaFin: '' }]); // Almacena los horarios

    const handleChangeTurnos = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumTurnos(value);

        // Generar el array de turnos con la cantidad seleccionada
        setHorarios(new Array(value).fill({ horaInicio: '', horaFin: '' }));
    };

    const handleChange = (index, e) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[index] = {
            ...nuevosHorarios[index],
            [e.target.name]: e.target.value,
        };
        setHorarios(nuevosHorarios);
    };

    const agregarHorarios = async (e) => {
        e.preventDefault();

        for (let i = 0; i < horarios.length; i++) {
            if (!validarHorario(horarios[i])) {
                return; // Si la validación falla, no continúa
            }

            // Convertir a formato 12 horas para almacenar
            const nuevoHorario = {
                horaInicio: convertirAFormato12(horarios[i].horaInicio),
                horaFin: convertirAFormato12(horarios[i].horaFin),
            };

            try {
                console.log("horario creado: ", nuevoHorario); // Ver el formato correcto
                const response = await clienteAxios.post('/horarios', nuevoHorario);

                // Llamar a la función onCrear pasando el nuevo horario
                if (typeof onCrear === 'function') {
                    const horarioCreado = `${response.data.horaInicio} - ${response.data.horaFin}`;
                    onCrear(horarioCreado);
                }

            } catch (error) {
                console.error('Error al crear el horario:', error);
                Swal.fire('Error', 'Hubo un problema al crear el horario', 'error');
            }
        }
        Swal.fire('Horario creado', 'El horario ha sido creado exitosamente', 'success');

        navigate('/horarios');
    };

    const validarHorario = (horario) => {
        const { horaInicio, horaFin } = horario;

        if (!horaInicio || !horaFin) {
            Swal.fire('Error', 'Por favor completa todos los campos', 'error');
            return false;
        }

        const inicio = new Date(`1970-01-01T${horaInicio}`);
        const fin = new Date(`1970-01-01T${horaFin}`);

        if (inicio >= fin) {
            Swal.fire('Error', 'La hora de inicio debe ser menor que la hora de fin', 'error');
            return false;
        }

        return true;
    };

    const convertirAFormato12 = (hora24) => {
        const [hh, mm] = hora24.split(':');
        const horas = parseInt(hh, 10);
        const modifier = horas >= 12 ? 'PM' : 'AM';
        const horas12 = horas % 12 || 12;
        return `${horas12}:${mm} ${modifier}`;
    };

    return (
        <div className="nueva-cita-container">
            <h2>Nueva disponibilidad</h2>
            <form onSubmit={agregarHorarios}>
                <label>
                    ¿Cuántos turnos deseas crear?
                    <input
                        type="number"
                        min="1"
                        value={numTurnos}
                        onChange={handleChangeTurnos}
                        required
                    />
                </label>

                {horarios.map((horario, index) => (
                    <div key={index}>
                        <label>
                            Hora Inicio ({index + 1}):
                            <input
                                type="time"
                                name="horaInicio"
                                value={horario.horaInicio}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </label>
                        <label>
                            Hora Fin ({index + 1}):
                            <input
                                type="time"
                                name="horaFin"
                                value={horario.horaFin}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </label>
                    </div>
                ))}

                <button className="btn btn-azul" type="submit">Crear Turnos</button>
            </form>
        </div>
    );
};

export default CrearDisponibilidad;
