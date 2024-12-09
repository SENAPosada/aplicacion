import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./Modal";
import clienteAxios from "./config/axios";
import NewAppointment from "./appointments/NewAppointment";
import { utcToZonedTime, format } from "date-fns-tz";

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  // Obtener citas y demás datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, categoriasRes, serviciosRes, turnosRes, clientesRes, tecnicosRes] = await Promise.all([
          clienteAxios.get("/appointments"),
          clienteAxios.get("/categorias"),
          clienteAxios.get("/servicios"),
          clienteAxios.get("/turnos"),
          clienteAxios.get("/clientes"),
          clienteAxios.get("/tecnicos"),
        ]);

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const formattedEvents = appointmentsRes.data.map((appointment) => {
          const localDate = utcToZonedTime(new Date(appointment.fecha), timezone);
          return {
            title: `${appointment.cliente.nombre} - ${appointment.servicio.tipo}`,
            start: format(localDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: timezone }),
            end: format(localDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: timezone }),
          };
        });

        setEvents(formattedEvents);
        setCategorias(categoriasRes.data);
        setServicios(serviciosRes.data);
        setTurnos(turnosRes.data);
        setClientes(clientesRes.data);
        setTecnicos(tecnicosRes.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Manejar selección de fecha
  const handleDateSelect = (selectionInfo) => {
    setSelectedDate(selectionInfo.startStr);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  // Actualizar los eventos al guardar una cita
  const handleSaveAppointment = (newAppointment) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = utcToZonedTime(new Date(newAppointment.fecha), timezone);
    const newEvent = {
      title: `${newAppointment.cliente.nombre} - ${newAppointment.servicio.tipo}`,
      start: format(localDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: timezone }),
      end: format(localDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: timezone }),
    };
    setEvents([...events, newEvent]);
    closeModal();
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
          startTime: "08:00", // Hora de inicio
          endTime: "16:00", // Hora de fin
        }}
        selectAllow={(selectInfo) => {
          const day = new Date(selectInfo.start).getDay();
          return day >= 1 && day <= 5; // Solo permite seleccionar de lunes a viernes
        }}
      />

      {isModalOpen && (
        <Modal cerrarModal={closeModal}>
          <NewAppointment
            selectedDate={selectedDate}
            onSave={handleSaveAppointment}
            existingAppointments={events}
            servicios={servicios}
            categorias={categorias}
            turnos={turnos}
            clientes={clientes}
            tecnicos={tecnicos}
          />
        </Modal>
      )}
    </div>
  );
};

export default Calendario;
