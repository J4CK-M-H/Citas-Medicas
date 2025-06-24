import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

interface IModalCrearDoctor {
  open: boolean;
  handleOpenModal: (open: boolean) => void;
  // Add other props as needed, e.g., onSubmit, doctorData, etc.
}

const ModalCrearDoctor = (props: IModalCrearDoctor) => {
  return (
    <Dialog
      open={props.open} // Change this to a state variable to control the modal visibility
      onClose={() => props.handleOpenModal(false)} // Close the modal when clicking outside or pressing escape
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" textAlign="center">
        {"Generar Cita"}
      </DialogTitle>
      <DialogContent>
        <Typography>s</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCrearDoctor;
