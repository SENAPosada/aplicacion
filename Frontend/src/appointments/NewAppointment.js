import React, { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import SelectOptions from "../componentes/Citas/SelectOptions"; // Importar SelectOptions
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz"; // Para trabajar con zonas horarias

const NewAppointment = ({ selectedDate, onSave, existingAppointments }) => {
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [filteredTurnos, setFilteredTurnos] = useState([]); // Turnos disponibles según técnico y fecha
  const [appointmentData, setAppointmentData] = useState({
    cliente: "",
    tecnico: "",
    servicio: "",
    categoria: "",
    direccion: "",
    ciudad: "",
    turno: "",
    fecha: selectedDate,
    estado: "Cargado",
  });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesData, tecnicosData, serviciosData, categoriasData, turnosData] = await Promise.all([
          clienteAxios.get("/clientes"),
          clienteAxios.get("/tecnicos"),
          clienteAxios.get("/servicios"),
          clienteAxios.get("/categorias"),
          clienteAxios.get("/turnos"),
        ]);

        setClientes(clientesData.data);
        setTecnicos(tecnicosData.data);
        setServicios(serviciosData.data);
        setCategorias(categoriasData.data);
        setTurnos(turnosData.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Filtrar turnos según técnico seleccionado y fecha
  useEffect(() => {
    if (appointmentData.tecnico && appointmentData.fecha) {
      const citasDelDia = (existingAppointments || []).filter(
        (cita) =>
          cita.tecnico._id === appointmentData.tecnico &&
          new Date(cita.fecha).toDateString() ===
            new Date(appointmentData.fecha).toDateString()
      );

      const turnosOcupados = citasDelDia.map((cita) => cita.turno._id);

      const turnosDisponibles = turnos.filter(
        (turno) => !turnosOcupados.includes(turno._id)
      );

      setFilteredTurnos(turnosDisponibles);
    } else {
      setFilteredTurnos(turnos);
    }
  }, [appointmentData.tecnico, appointmentData.fecha, turnos, existingAppointments]);

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!appointmentData.turno) {
      Swal.fire("Error", "Debes seleccionar un turno", "error");
      return;
    }
  
    try {
      // Convierte la fecha seleccionada al formato UTC
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const fechaUtc = utcToZonedTime(new Date(appointmentData.fecha), timezone);
      const fechaFormateada = format(fechaUtc, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  
      const response = await clienteAxios.post("/appointments", {
        ...appointmentData,
        fecha: fechaFormateada, // Enviar fecha en UTC al backend
      });
  
      Swal.fire("Éxito", "Cita creada correctamente", "success");
      onSave(response.data); // Actualizar calendario
    } catch (error) {
      Swal.fire("Error", "No se pudo crear la cita", "error");
      console.error("Error al crear la cita:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Nueva Cita</h2>

      <div className="form-group">
        <SelectOptions
          data={clientes}
          id="clientes"
          name="cliente"
          selectedValue={appointmentData.cliente}
          handleChange={handleChange}
          label="Seleccionar Cliente"
        />
      </div>

      <div className="form-group">
        <SelectOptions
          data={tecnicos}
          id="tecnicos"
          name="tecnico"
          selectedValue={appointmentData.tecnico}
          handleChange={handleChange}
          label="Seleccionar Técnico"
        />
      </div>

      <div className="form-group">
        <label>Servicio:</label>
        <select
          name="servicio"
          value={appointmentData.servicio}
          onChange={handleChange}
        >
          <option value="">Seleccione un servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio._id} value={servicio._id}>
              {servicio.tipo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Categoría:</label>
        <select
          name="categoria"
          value={appointmentData.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.tipo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Turno:</label>
        <select
          name="turno"
          value={appointmentData.turno}
          onChange={handleChange}
        >
          <option value="">Seleccione un turno</option>
          {filteredTurnos.map((turno) => (
            <option key={turno._id} value={turno._id}>
              {turno.title} ({turno.startTime} - {turno.endTime})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={appointmentData.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ciudad:</label>
        <input
          type="text"
          name="ciudad"
          value={appointmentData.ciudad}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Guardar Cita</button>
    </form>
  );
};

export default NewAppointment;
