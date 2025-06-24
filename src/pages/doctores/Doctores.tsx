import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "../../services/doctorService";
import Buscador from "../../components/Buscador/Buscador";
import React, { useState } from "react";
import ModalCrearDoctor from "./ModalCrearDoctor";

const Doctores = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    rowsPerPage: 15,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpenModal = (open: boolean) => {
    setOpen(open);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPagination({
      page: 1,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleChangePage = (_event: any, newPage: number) => {
    setPagination({ ...pagination, page: newPage + 1 });
  };

  const onSearchSubmit = (): void => {
    setPagination({ ...pagination, page: 1 });
    setSearchTerm(searchValue);
  };

  const doctores = useQuery({
    queryKey: ["doctores", pagination.page, pagination.rowsPerPage, searchTerm],
    queryFn: async () =>
      doctorService.obtenerDoctores(
        pagination.page,
        pagination.rowsPerPage,
        searchTerm
      ),
    refetchOnWindowFocus: false,
  });

  const renderColumns = (item: any, index: number) => {
    return (
      <>
        <TableCell sx={{ padding: "20px" }}>{index + 1}</TableCell>
        <TableCell sx={{ padding: "20px" }}>
          {`${item?.nombres} ${item?.apellidos}`}
        </TableCell>
        <TableCell sx={{ padding: "20px" }}>
          {item?.especialidad?.nombre}
        </TableCell>
        <TableCell
          sx={{
            padding: "20px",
          }}
        >
          <Typography
            component={"span"}
            sx={{
              fontSize: ".9rem",
              p: 1,
              borderRadius: "3px",
            }}
          >
            {item.cmp}
          </Typography>
        </TableCell>
        <TableCell sx={{ padding: "20px" }}>{item.correo}</TableCell>
        <TableCell sx={{ padding: "20px" }}>{item.telefono}</TableCell>
      </>
    );
  };

  console.log("doctores", doctores.data);
  return (
    <Box>
      <Typography component="p" fontSize={24}>
        Lista de Doctores
      </Typography>

      {doctores.isLoading ? (
        <Typography> Cargando.. </Typography>
      ) : (
        <Box sx={{ mt: 2 }}>
          {doctores.isError ? (
            <Typography color="error">Error al cargar los doctores.</Typography>
          ) : (
            <Paper>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
              >
                <Button
                  variant="text"
                  sx={{
                    backgroundColor: "#3D90D7",
                    color: "white",
                    fontWeight: "500",
                  }}
                  onClick={() => handleOpenModal(true)}
                >
                  Agregar Doctor
                </Button>
                <Buscador
                  searchValue={searchValue}
                  onSearchChange={onSearchChange}
                  onSearchSubmit={onSearchSubmit}
                />
              </Box>
              <Box sx={{ maxHeight: 500, overflowY: "auto" }}>
                <Table
                  stickyHeader
                  size="small"
                  sx={{
                    borderTop: "1px solid #ccc",
                  }}
                >
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          N°
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          Doctor
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          Especialidad
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          CMP
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          correo
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          Telefono
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {doctores.data?.doctores.length > 0 ? (
                        doctores.data?.doctores.map(
                          (paciente: any, index: number) => (
                            <TableRow key={paciente.id}>
                              {renderColumns(paciente, index)}
                            </TableRow>
                          )
                        )
                      ) : (
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
                      )}
                    </TableBody>
                  </>
                </Table>
                <TablePagination
                  labelRowsPerPage="Filas por página"
                  component="div"
                  count={doctores.data.doctores?.total || 0}
                  page={pagination.page - 1}
                  onPageChange={handleChangePage}
                  rowsPerPage={pagination.rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </Paper>
          )}
        </Box>
      )}

      <ModalCrearDoctor open={open} handleOpenModal={handleOpenModal} />
    </Box>
  );
};

export default Doctores;
