import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // Tu API base
});

// Interceptor para agregar token (opcional)
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // o cookies
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
