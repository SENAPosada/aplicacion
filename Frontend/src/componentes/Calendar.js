import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Asegúrate de que esta librería esté instalada
import 'react-calendar/dist/Calendar.css'; // Estilos del calendario

const TechnicalSupportCalendar = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Data, setData] = useState({});

    const handleInputClick = () => {
        setShowCalendar(!showCalendar); // Alternar la visibilidad del calendario
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false); // Ocultar el calendario después de seleccionar la fecha
    };

    const getShortDayName = (date) => {
        const options = { weekday: "long", locale: "es-ES" };
        return date.toLocaleDateString("es-ES", options).split(" ")[0]; // Retorna el nombre abreviado
    };
    return (
        <div>
            <h4>Fecha:</h4>
            <input
                style={{ cursor: "pointer" }}
                type="text"
                value={`${selectedDate.getDate()}/${selectedDate.getMonth() + 1
                    }/${selectedDate.getFullYear()} ${getShortDayName(selectedDate)}`}
                onClick={handleInputClick}
                readOnly
                placeholder="Selecciona una fecha"
            />
            {showCalendar && (
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    locale="es"
                    tileDisabled={({ date }) =>
                        date.getDay() === 0 || date.getDay() === 6
                    } // Deshabilitar fines de semana
                />
            )}
        </div>
    );
};

export default TechnicalSupportCalendar;
