import React, { useEffect, useState } from "react";
import useTechnicalsStore from "../../store/useTechnicals.store";
import useClientsStore from "../../store/useClients.store";
import useSparesStore from "../../store/useSpares.store";
import SelectOptions from "../Citas/SelectOptions"; 
import TechnicalSupportCalendar from "../Calendar"; 
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

const NuevaCita = () => {
  const { fetchTechnicals, technicals } = useTechnicalsStore();
  const { fetchClients, clients } = useClientsStore();
  const { fetchSpares, spares } = useSparesStore();

  const [Data, setData] = useState({
    cliente: "",         // Cambiado de selectedClient a cliente
    tecnico: "",        // Cambiado de selectedTechnical a tecnico
    repuesto: "",       // Cambiado de selectedSpare a repuesto
    direccion: "",
    ciudad: "",
    fecha: new Date(), 
    horario: "", 
  });

  const horariosPosibles = [
    "8:00 AM - 10:00 AM",
    "12:00 PM - 02:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  useEffect(() => {
    fetchTechnicals();
    fetchClients();
    fetchSpares();
  }, [fetchTechnicals, fetchClients, fetchSpares]);

  const handleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setData({
      ...Data,
      fecha: date, 
    });
  };

  const handleHorarioChange = (e) => {
    setData({
      ...Data,
      horario: e.target.value, 
    });
  };

  const reservarCita = (e) => {
    e.preventDefault(); 
    clienteAxios.post('/citas', Data)
      .then(res => {
        console.log("Cita reservada:", res.data);
        Swal.fire({
          icon: 'success',
          title: 'Cita Reservada',
          text: 'Tu cita ha sido reservada correctamente',
        });
      })
      .catch(error => {
        console.error("Error al reservar la cita:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al reservar la cita',
        });
      });
  };

  return (
    <>
      <h2>Nueva Cita</h2>
      <SelectOptions
        data={clients}
        id="clientes"
        name="cliente" 
        selectedValue={Data.cliente}
        handleChange={handleChange}
        label="Seleccionar Cliente"
      />

      <SelectOptions
        data={technicals}
        id="tecnicos"
        name="tecnico"
        selectedValue={Data.tecnico} 
        handleChange={handleChange}
        label="Seleccionar Técnico"
      />

      <SelectOptions
        data={spares}
        id="repuestos"
        name="repuesto"
        selectedValue={Data.repuesto} 
        handleChange={handleChange}
        label="Seleccionar Repuesto"
      />

      <div style={{ marginBottom: "1rem" }}>
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

      <div style={{ marginBottom: "1rem" }}>
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

      <TechnicalSupportCalendar onDateChange={handleDateChange} />

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="horario">Horario:</label>
        <select
          id="horario"
          name="horario"
          value={Data.horario}
          onChange={handleHorarioChange}
        >
          <option value="">Selecciona un horario</option>
          {horariosPosibles.map((horario, index) => (
            <option key={index} value={horario}>{horario}</option>
          ))}
        </select>
      </div>
      
      <button onClick={reservarCita} className="btn btn-azul">
        Reservar Cita
      </button>
    </>
  );
};

export default NuevaCita;
