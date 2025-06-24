import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Buscador from "../components/Buscador/Buscador";
import { useState } from "react";
import { citasService } from "../services/citaService";
import ModalCrearCita from "../components/citas/ModalCrearCita";

const Citas = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    rowsPerPage: 15,
  });
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["citas", searchTerm],
    queryFn: () =>
      citasService.obtenerCitas(
        pagination.page,
        pagination.rowsPerPage,
        searchTerm
      ),
    refetchOnWindowFocus: false,
  });

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSearchTerm(searchValue);
  };

  const handleChangePage = (_event: any, newPage: number) => {
    setPagination({ ...pagination, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPagination({
      page: 1,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const renderColumns = (item: any, index: number) => {
    return (
      <>
        <TableCell sx={{ padding: "20px" }}>{index + 1}</TableCell>
        <TableCell sx={{ padding: "20px" }}>
          {`${item.paciente?.nombres} ${item.paciente?.apellidos}`}
        </TableCell>
        <TableCell sx={{ padding: "20px" }}>{item?.paciente?.dni}</TableCell>
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
              color: "white",
              bgcolor: `${item.estado == "pendiente" ? "#E67514" : ""}`,
            }}
          >
            {item.estado}
          </Typography>
        </TableCell>
        <TableCell sx={{ padding: "20px" }}>{item.fecha}</TableCell>
        <TableCell sx={{ padding: "20px" }}>{item.hora}</TableCell>
      </>
    );
  };

  if (isLoading) return "Loading...";

  return (
    <Box>
      <Snackbar
        open={alertError}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlertError(false)}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert
          onClose={() => setAlertError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
      <Button
        variant="text"
        sx={{ backgroundColor: "#3D90D7", color: "white", fontWeight: "500" }}
        onClick={() => setOpenModal(true)}
      >
        Generar Cita
      </Button>
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
                    Paciente
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    DNI
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    Estado
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    Hora
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.citas.length > 0 ? (
                  data?.citas.map((paciente: any, index: number) => (
                    <TableRow key={paciente.id}>
                      {renderColumns(paciente, index)}
                    </TableRow>
                  ))
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
        </Box>

        <TablePagination
          component="div"
          count={data?.total || 0}
          page={pagination.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </Paper>

      <ModalCrearCita
        open={openModal}
        handleClose={handleClose}
        setAlertError={setAlertError}
        setMessageAlert={setMessageAlert}
        messageAlert={messageAlert}
      />
    </Box>
  );
};

export default Citas;
