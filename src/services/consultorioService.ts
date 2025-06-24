import { api } from ".";

const obtenerConsultorios = async (page = 1, pageCount = 15, search = "") => {
  const { data } = await api("consultorios", {
    params: {
      page,
      limit: pageCount,
      search, // backend debe manejarlo
    },
  });
  return data;
};

export const consultorioService = {
  obtenerConsultorios,
};
