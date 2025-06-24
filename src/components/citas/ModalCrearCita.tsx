import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { consultorioService } from "../../services/consultorioService";
import { doctorService } from "../../services/doctorService";
import { citasService } from "../../services/citaService";
import type { IAddCita } from "../../services/interfaces/cita-interface";

interface IModalCrearCita {
  open: boolean;
  handleClose: () => void;
  setAlertError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
  messageAlert: string;
}

const ModalCrearCita = (props: IModalCrearCita) => {
  const [fechaHoraCita, setFechaHoraCita] = useState<null | Date>(null);
  const [dni, setDni] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [consultorioSeleccionado, setConsultorioSeleccionado] = useState("");
  const [doctorSeleccionado, setDoctorSeleccionado] = useState("");

  const {
    data: consultorios = [],
    isError,
    error,
  } = useQuery({
    queryKey: ["consultorios"],
    queryFn: () => consultorioService.obtenerConsultorios(),
    refetchOnWindowFocus: false,
  });

  const { data: doctores = [] } = useQuery({
    queryKey: ["doctores"],
    queryFn: () => doctorService.obtenerDoctores(),
    refetchOnWindowFocus: false,
  });

  const cleanFields = () => {
    setFechaHoraCita(null);
    setConsultorioSeleccionado("");
    setDoctorSeleccionado("");
    setDni("");
    setDescripcion("");
  };

  const mutation = useMutation({
    mutationFn: (body: IAddCita) => citasService.crearCita(body),
    onSuccess: () => {
      cleanFields();
    },
    onError(error) {
      console.log(error);
      props.setMessageAlert(
        error.response?.data?.error
          ? error.response?.data?.error
          : "Error creando la cita"
      );
      props.setAlertError(true);
    },
    // onError: () => {
    // },
  });

  const handleChangeDNI = (event: any): void => {
    const value = event.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setDni(value);
    }
  };

  const handleCrearCita = (event: React.FormEvent): void => {
    event.preventDefault();

    if (
      [descripcion, dni, consultorioSeleccionado, doctorSeleccionado].some(
        (field) => field.trim() == ""
      )
    ) {
      props.setMessageAlert("Ingrese todos los campos");
      props.setAlertError(true);
      return;
    }

    if (fechaHoraCita == null) {
      props.setMessageAlert("Ingrese todos los campos");
      props.setAlertError(true);
      return;
    }

    const year = fechaHoraCita?.getFullYear();
    const month = String(fechaHoraCita?.getMonth()! + 1).padStart(2, "0");
    const day = String(fechaHoraCita?.getDate()).padStart(2, "0");
    const fecha = `${year}-${month}-${day}`;
    const hora = fechaHoraCita?.toLocaleTimeString().split(" ")[0]!;

    const body = {
      fecha,
      hora,
      descripcion,
      paciente: dni,
      doctor: doctorSeleccionado,
      consultorio: consultorioSeleccionado,
      estado: "pendiente",
    };
    mutation.mutate(body);
  };

  if (isError) console.log(error);
  if (mutation.error) console.log(mutation.error);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen={true}
      // sx={{ width: "600px", height: 500 }}
      sx={{
        "& .MuiDialog-paper": {
          xs: { width: "80%", height: "500px" },
          md: { width: "60%" },
          xl: { width: "40%" },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" textAlign="center">
        {"Generar Cita"}
      </DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2}>
            <Grid container spacing={2} size={12}>
              <Grid
                size={10}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "text",
                  // border: "1px solid black",
                }}
              >
                <Typography sx={{}}>Fecha y hora de la Cita</Typography>
                <Box
                  sx={{
                    padding: "0 10px",
                    m: 0,
                    display: "flex",
                    flexDirection: "column",
                    outline: "1px solid #31363F",
                    borderRadius: "5px",
                  }}
                >
                  <DatePicker
                    selected={fechaHoraCita}
                    onChange={(date) => setFechaHoraCita(date)}
                    showTimeSelect
                    timeFormat="p"
                    wrapperClassName="datepicker-wrapper"
                    className="datepicker-style"
                    timeIntervals={15}
                    dateFormat="Pp"
                  />
                </Box>
              </Grid>
              <Grid size={2} sx={{ display: "flex", alignItems: "end" }}>
                <Button variant="contained" sx={{ height: "40px" }}>
                  Verificar
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3} size={12}>
              <Grid size={6}>
                <Typography>DNI del paciente</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={dni}
                  // onChange={(event) => setDni(event?.target.value)}
                  onChange={handleChangeDNI}
                  slotProps={{
                    htmlInput: { maxLength: 8 },
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      outlineWidth: "10px",
                      // height: "42px",
                      "& fieldset": {
                        borderColor: "#31363F",
                        outline: "none",
                      },
                      "&:hover fieldset": {
                        borderColor: "#31363F", // borde al pasar el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#31363F", // quitar azul al hacer focus
                        borderWidth: "1px",
                        outline: "none",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <Typography sx={{}}>Consultorio</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  select
                  defaultValue={""}
                  slotProps={{
                    select: {
                      native: true,
                    },
                  }}
                  value={consultorioSeleccionado}
                  onChange={(event) =>
                    setConsultorioSeleccionado(event?.target.value)
                  }
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      outlineWidth: "10px",
                      // height: "42px",
                      "& fieldset": {
                        borderColor: "#31363F",
                        outline: "none",
                      },
                      "&:hover fieldset": {
                        borderColor: "#31363F", // borde al pasar el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#31363F", // quitar azul al hacer focus
                        borderWidth: "1px",
                        outline: "none",
                      },
                    },
                  }}
                >
                  <option value="">Selecciona una opcion</option>
                  {consultorios.map((option: any) => (
                    <option key={option?.id} value={option?.id}>
                      {option.nombre}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid size={12}>
              <Typography>Doctor</Typography>
              <TextField
                variant="outlined"
                size="small"
                defaultValue={""}
                select
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                value={doctorSeleccionado}
                onChange={(event) => setDoctorSeleccionado(event?.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    outlineWidth: "10px",
                    // height: "42px",
                    "& fieldset": {
                      borderColor: "#31363F",
                      outline: "none",
                    },
                    "&:hover fieldset": {
                      borderColor: "#31363F", // borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#31363F", // quitar azul al hacer focus
                      borderWidth: "1px",
                      outline: "none",
                    },
                  },
                }}
              >
                <option value="">Selecciona una opcion</option>
                {doctores.data?.doctores.map((option: any) => (
                  <option key={option?.id} value={option?.id}>
                    Dr(a). {option.nombres} {option.apellidos} -{" "}
                    {option.especialidad?.nombre}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <Typography sx={{}}>Descripción/Motivo</Typography>
              <TextField
                variant="outlined"
                size="small"
                multiline
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                rows={4}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    height: 100,
                    "& fieldset": {
                      borderColor: "#31363F",
                      outline: "none",
                    },
                    "&:hover fieldset": {
                      borderColor: "#31363F", // borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#31363F", // quitar azul al hacer focus
                      borderWidth: "1px",
                      outline: "none",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cleanFields} variant="contained">
          Limpiar
        </Button>
        <Button
          onClick={handleCrearCita}
          type="button"
          autoFocus
          variant="contained"
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCrearCita;
