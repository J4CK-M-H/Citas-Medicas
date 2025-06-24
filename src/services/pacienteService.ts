import { api } from "./index";

const obtenerPacientes = async (page = 1, pageCount = 15, search = "") => {
  const response = await api(`/pacientes/obtener-pacientes`, {
    params: {
      page,
      limit: pageCount,
      search, // backend debe manejarlo
    },
  }); // usa api.get en lugar de axios directamente
  return response.data;
};

export const pacienteService = {
  obtenerPacientes,
};
