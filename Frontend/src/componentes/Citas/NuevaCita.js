import React, { useEffect, useState } from "react";
import useTechnicalsStore from "../../store/useTechnicals.store";
import useClientsStore from "../../store/useClients.store";
import useSparesStore from "../../store/useSpares.store"; // Cambia a useSparesStore

const NuevaCita = () => {
  const { fetchTechnicals, technicals } = useTechnicalsStore();
  const { fetchClients, clients } = useClientsStore();
  const { fetchSpares, spares } = useSparesStore(); // Ajusta para obtener spares
  const [selectedTechnical, setSelectedTechnical] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedSpare, setSelectedSpare] = useState(""); // Cambia el nombre a selectedSpare
  const [direccion, setDireccion] = useState(""); // Nuevo estado para la dirección
  const [ciudad, setCiudad] = useState(""); // Nuevo estado para la ciudad

  useEffect(() => {
    fetchTechnicals();
    fetchClients();
    fetchSpares(); // Llama a la función para obtener repuestos
  }, [fetchTechnicals, fetchClients, fetchSpares]);

  const handleTechnicalChange = (event) => {
    setSelectedTechnical(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleSpareChange = (event) => {
    setSelectedSpare(event.target.value); // Actualiza el estado con el repuesto seleccionado
  };

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value); // Actualiza el estado con la dirección
  };

  const handleCiudadChange = (event) => {
    setCiudad(event.target.value); // Actualiza el estado con la ciudad
  };

  return (
    <>
      <h2>Nueva Cita</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="clientes">Seleccionar Cliente:</label>
        <select id="clientes" value={selectedClient} onChange={handleClientChange}>
          <option value="">-- Selecciona un cliente --</option>
          {clients.length > 0 ? (
            clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.nombre} {client.apellido}
              </option>
            ))
          ) : (
            <option value="">No hay clientes disponibles</option>
          )}
        </select>
      </div>
      
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="tecnicos">Seleccionar Técnico:</label>
        <select id="tecnicos" value={selectedTechnical} onChange={handleTechnicalChange}>
          <option value="">-- Selecciona un técnico --</option>
          {technicals.length > 0 ? (
            technicals.map((technical) => (
              <option key={technical._id} value={technical._id}>
                {technical.nombre} {technical.apellido}
              </option>
            ))
          ) : (
            <option value="">No hay técnicos disponibles</option>
          )}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="repuestos">Seleccionar Repuesto:</label>
        <select id="repuestos" value={selectedSpare} onChange={handleSpareChange}>
          <option value="">-- Selecciona un repuesto --</option>
          {spares.length > 0 ? (
            spares.map((spare) => (
              <option key={spare._id} value={spare._id}>
                {spare.nombre} {/* Asegúrate de que el campo "nombre" sea correcto */}
              </option>
            ))
          ) : (
            <option value="">No hay repuestos disponibles</option>
          )}
        </select>
      </div>

      {/* Nuevo campo de Dirección */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={handleDireccionChange} // Manejar el cambio
          placeholder="Ingresa la dirección"
        />
      </div>

      {/* Nuevo campo de Ciudad */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          value={ciudad}
          onChange={handleCiudadChange} // Manejar el cambio
          placeholder="Ingresa la ciudad"
        />
      </div>
    </>
  );
};

export default NuevaCita;
