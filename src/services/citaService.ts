import { api } from ".";
import type { IAddCita } from "./interfaces/cita-interface";

// interface IFilterProps {
//   page: number;
//   limit: number;
//   search: string;
// }

const obtenerCitas = async (page = 1, pageCount = 15, search = "") => {
  const response = await api("/citas", {
    params: {
      page,
      limit: pageCount,
      search, // backend debe manejarlo
    },
  });
  return response.data;
};

const crearCita = async (bodyCita: IAddCita) => {
  const response = await api.post("citas", bodyCita);
  return response.data;
};

export const citasService = {
  obtenerCitas,
  crearCita,
};
