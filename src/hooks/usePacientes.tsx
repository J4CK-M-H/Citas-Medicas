import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { pacienteService } from "../services/pacienteService";

// const initialValuesFilter = {
//   page: 1,
//   pageCount: 15,
//   search: "",
// };

const usePacientes = (pagination: any, searchTerm: string = "") => {
  const [pacienteActual, setPacienteActual] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "pacientes",
      pagination.page,
      pagination.rowsPerPage,
      searchTerm,
    ],
    queryFn: () =>
      pacienteService.obtenerPacientes(
        pagination.page,
        pagination.rowsPerPage,
        searchTerm
      ),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    pacienteActual,
    setPacienteActual,
  };
};
export default usePacientes;
