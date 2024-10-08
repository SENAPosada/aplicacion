import axios from "axios";

export const GetTechnicals = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return null; // Devuelve null en caso de error
  }
};

// Nueva función para actualizar el estado del técnico
export const UpdateTechnicalStatus = async (endpoint, data) => {
  try {
    const response = await axios.put(endpoint, data);
    console.log(response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (err) {
    console.log(err);
    return null; // Devuelve null en caso de error
  }
};
