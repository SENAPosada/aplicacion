import axios from "axios";

export const Getclients = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};