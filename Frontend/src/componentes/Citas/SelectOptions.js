import React from "react";

const SelectOptions = ({ data, id, name, selectedValue, handleChange, label }) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor={id}>{label}</label>
        <select id={id} name={name} value={selectedValue} onChange={handleChange}>
          <option value="">-- {label} --</option>
          {data.length > 0 ? (
            data.map((item) => (
              <option key={item.cedula} value={item.cedula}> {/* Aquí usamos cedula como valor */}
                {item.nombre} {item.apellido} {/* Mostramos el nombre y apellido */}
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

