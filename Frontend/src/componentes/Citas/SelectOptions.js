import React from "react";

const SelectOptions = ({ data, id, name, selectedValue, handleChange, label }) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor={id}>{label}</label>
        <select id={id} name={name} value={selectedValue} onChange={handleChange}>
          <option value="">-- {label} --</option>
          {data.length > 0 ? (
            data.map((item) => (
              <option key={item.documento} value={item.documento}> {/* Aquí usamos documento como valor */}
                {item.nombres} {item.apellidos} {/* Mostramos el nombre y apellido */}
              </option>
            ))
          ) : (
            <option value="">No hay disponibles</option>
          )}
        </select>
      </div>
    );
  };
  
export default SelectOptions;

