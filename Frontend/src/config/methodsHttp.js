import axios from "axios";
//body es el objeto que contiene tecnico, cliente, servicio, repuesto
// methodsHttp.js
export const GetMethod = async (endpoint, body, token = null) => {
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.get(endpoint, { headers });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error en GET:", err);
    return err;
  }
};

// Método POST
export const PostMethod = async (endpoint, body, token = null) => {
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await axios.post(endpoint, body, { headers });
    console.log("Respuesta POST:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error en POST:", err);
    return err;
  }
};
