import { useMemo, useState } from "react";
import usePacientes from "../hooks/usePacientes";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Buscador from "../components/Buscador/Buscador";

const Pacientes = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    rowsPerPage: 15,
  });
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = usePacientes(pagination, searchTerm);

  const handleChangePage = (_event: any, newPage: number) => {
    setPagination({ ...pagination, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPagination({
      page: 1,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const columns = [
    {
      id: "nombres",
      header: "Nombres",
      render: (paciente: any) => paciente.nombres,
    },
    {
      id: "correo",
      header: "Correo",
      render: (paciente: any) => paciente.correo,
    },
    {
      id: "fechaNacimiento",
      header: "Fecha de Nacimiento",
      render: (paciente: any) => paciente.fechaNacimiento,
    },
    {
      id: "dni",
      header: "DNI",
      render: (paciente: any) => paciente.dni,
    },
    {
      id: "acciones",
      header: "Opciones",
      render: (paciente: any) => (
        <button onClick={() => alert(paciente.id)}>Editar</button>
      ),
    },
  ];

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  console.log("Change");

  const handleSearchSubmit = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSearchTerm(searchValue);
  };

  const renderedRows = useMemo(() => {
    if (!data?.pacientes.length)
      return (
        <Typography
          variant="body2"
          component="p"
          align="center"
          sx={{
            p: 2,
            fontSize: 30,
            textAlign: "center",
            width: "100%",
            margin: "0 auto",
          }}
        >
          No hay datos
        </Typography>
      );

    return (
      <>
        <TableHead>
          <TableRow>
            {columns.map((col: any) => (
              <TableCell>{col.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.pacientes.map((paciente: any) => (
            <TableRow key={paciente.id}>
              {columns.map((col) => (
                <TableCell key={col.id} sx={{ padding: "20px" }}>
                  {col.render(paciente)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </>
    );
  }, [data?.pacientes]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching pacientes.</p>;

  return (
    <Box>
      <Typography component="p" fontSize={24}>
        Lista de pacientes
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Buscador
            searchValue={searchValue}
            onSearchChange={handleSearchValue}
            onSearchSubmit={handleSearchSubmit}
          />
        </Box>
        <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
          <Table
            aria-label="sticky table"
            stickyHeader
            size="small"
            sx={{
              borderTop: "1px solid #ccc",
            }}
          >
            {renderedRows}
          </Table>
        </Box>

        <TablePagination
          labelRowsPerPage="Filas por página"
          component="div"
          count={data?.total || 0}
          page={pagination.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </Paper>
    </Box>
  );
};

export default Pacientes;
