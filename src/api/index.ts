import axios from "axios";

const api = axios.create({ baseURL: "https://api-steamproject.onrender.com" });

export default api;
