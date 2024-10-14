import React, { useEffect, useState } from "react";
import useTechnicalsStore from "../../store/useTechnicals.store";
import useClientsStore from "../../store/useClients.store";
import useSparesStore from "../../store/useSpares.store";
import useCitasStore from "../../store/useCitas.store";
import SelectOptions from "../Citas/SelectOptions";
import TechnicalSupportCalendar from "../Calendar";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const NuevaCita = () => {
  const navigate = useNavigate();
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const { fetchTechnicals, technicals } = useTechnicalsStore();
  const { fetchClients, clients } = useClientsStore();
  const { fetchSpares, spares } = useSparesStore();
  const { fetchCitas, citas } = useCitasStore();
  const [technicalDocument, setTechnicalDocument] = useState("");
  const [Data, setData] = useState({
    cliente: "",
    tecnico: "",
    repuesto: "",
    direccion: "",
    ciudad: "",
    fecha: new Date(),
    horario: "",
    estado: "Activado"
  });

  const horariosPosibles = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "2:00 PM - 4:00 PM",
  ];

  useEffect(() => {
    fetchTechnicals();
    fetchClients();
    fetchSpares();
    fetchCitas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setData({
      ...Data,
      fecha: date,
    });

    // Actualizar horarios disponibles si ya se ha seleccionado un técnico
    if (Data.tecnico) {
      const citasDelDia = citas.filter(cita => 
        new Date(cita.fecha).toDateString() === new Date(date).toDateString() && cita.tecnico === Data.tecnico // Filtrando por técnico
      );

      const horariosOcupados = citasDelDia.map(cita => cita.horario);
      const horariosDisponibles = horariosPosibles.filter(
        horario => !horariosOcupados.includes(horario)
      );

      setHorariosDisponibles(horariosDisponibles);
    }
};


  const handleTechnicalDocument = (e) => {
    const { value } = e.target;
    setTechnicalDocument(value);
    setData(prevData => ({
      ...prevData,
      tecnico: value,
    }));

    // Actualizar horarios disponibles si ya hay fecha
    if (Data.fecha) {
      const citasDelDia = citas.filter(cita => 
        new Date(cita.fecha).toDateString() === new Date(Data.fecha).toDateString() && cita.tecnico === value // Filtrando por técnico
      );

      const horariosOcupados = citasDelDia.map(cita => cita.horario);
      const horariosDisponibles = horariosPosibles.filter(
        horario => !horariosOcupados.includes(horario)
      );

      setHorariosDisponibles(horariosDisponibles);
    } else {
      // Si no hay fecha seleccionada, limpiar horarios
      setHorariosDisponibles(horariosPosibles);
    }
};


  const reservarCita = (e) => {
    e.preventDefault();
    clienteAxios.post('/citas', Data)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Cita Reservada',
          text: 'Tu cita ha sido reservada correctamente',
        }).then(() => {
          navigate('/citas');
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al reservar la cita',
        });
      });
  };

  return (
    <div className="nueva-cita-container">
      <h2>Nueva Cita</h2>

      <div className="form-group">
        <label htmlFor="cliente">Seleccionar Cliente</label>
        <SelectOptions
          data={clients}
          id="clientes"
          name="cliente"
          selectedValue={Data.cliente}
          handleChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tecnico">Seleccionar Técnico</label>
        <SelectOptions
          data={technicals}
          id="tecnicos"
          name="tecnico"
          selectedValue={Data.tecnico}
          handleChange={handleTechnicalDocument}
        />
      </div>

      {/* Sección de fecha después de seleccionar el técnico */}
      <div className="form-group">
        <label htmlFor="fecha">Seleccionar Fecha:</label>
        <TechnicalSupportCalendar onDateChange={handleDateChange} />
      </div>

      <div className="form-group">
        <label htmlFor="repuesto">Seleccionar Repuesto</label>
        <SelectOptions
          data={spares}
          id="repuestos"
          name="repuesto"
          selectedValue={Data.repuesto}
          handleChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={Data.direccion}
          onChange={handleChange}
          placeholder="Ingresa la dirección"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          value={Data.ciudad}
          onChange={handleChange}
          placeholder="Ingresa la ciudad"
        />
      </div>

      <div className="form-group">
        <label htmlFor="horario">Horario:</label>
        <select
          id="horario"
          name="horario"
          value={Data.horario}
          onChange={handleChange}
        >
          <option value="">Selecciona un horario</option>
          {horariosDisponibles.map((horario, index) => (
            <option key={index} value={horario}>{horario}</option>
          ))}
        </select>
      </div>

      <button onClick={reservarCita} className="btn btn-azul">
        Reservar Cita
      </button>
    </div>
  );
};

export default NuevaCita;
