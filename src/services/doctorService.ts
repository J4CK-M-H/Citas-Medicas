import { api } from ".";

const obtenerDoctores = async (page = 1, pageCount = 15, search = "") => {
  const { data } = await api("doctores", {
    params: {
      page,
      limit: pageCount,
      search, // backend debe manejarlo
    },
  });
  return data;
};

export const doctorService = {
  obtenerDoctores,
};
