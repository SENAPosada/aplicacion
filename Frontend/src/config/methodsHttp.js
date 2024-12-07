import axios from "axios";
//body es el objeto que contiene tecnico, cliente, servicio, repuesto
export const GetMethod = async (endopoint, body) => {
  try {
    const response = await axios.get(endopoint);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Método POST
export const PostMethod = async (endpoint, body) => {
  try {
    const response = await axios.post(endpoint, body);
    console.log("Respuesta POST:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error en POST:", err);
    return err;
  }
};