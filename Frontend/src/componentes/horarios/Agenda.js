import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const Agenda = () => {
    const [horariosPosibles, setHorariosPosibles] = useState([]);

    useEffect(() => {
        const cargarHorarios = async () => {
            try {
                const response = await clienteAxios.get('/horarios');
                const horariosOrdenados = response.data.sort((a, b) => {
                    const inicioA = new Date(`1970-01-01T${convertir24Horas(a.horaInicio)}`);
                    const inicioB = new Date(`1970-01-01T${convertir24Horas(b.horaInicio)}`);
                    return inicioA - inicioB;
                });
                setHorariosPosibles(horariosOrdenados);
            } catch (error) {
                console.error('Error al cargar los horarios:', error);
            }
        };

        cargarHorarios();
    }, [horariosPosibles]);

    const convertir24Horas = (hora12) => {
        const [time, modifier] = hora12.split(' ');
        let [horas, minutos] = time.split(':');

        if (modifier === 'PM' && horas !== '12') {
            horas = parseInt(horas, 10) + 12;
        } else if (modifier === 'AM' && horas === '12') {
            horas = '00';
        }

        return `${horas}:${minutos}`;
    };

    return (
        <div>
            <h2>Agenda</h2>

            {/* Link para agregar nueva disponibilidad */}
            <Link to="/horarios/nuevo" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Agregar Disponibilidad
            </Link>

            <table className="tabla-clientes">
                <thead>
                    <tr>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                    </tr>
                </thead>
                <tbody>
                    {horariosPosibles.map((horario, index) => (
                        <tr key={index}>
                            <td>{horario.horaInicio}</td>
                            <td>{horario.horaFin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Agenda;
