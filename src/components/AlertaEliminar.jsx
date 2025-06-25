import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Snackbar, Alert } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteEmpleado } from '../services/fetchEmpleados';
import { useState } from 'react';

export function AlertaEliminar({ open, setOpen, empleadoID, empleado, recargarEmpleados }) {

    const [snackStatus, setSnackStatus] = useState(false)
    const [message, setMessage] = useState('')
    const [empleadoMock, setEmpleadoMock] = useState({
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        fecha_nacimiento: empleado.fecha_nacimiento,
        direccion: empleado.direccion,
        telefono: empleado.telefono,
        correo_electronico: empleado.correo_electronico,
        activo: false,
        departamento_id: empleado.departamento_id,
        municipio_id: empleado.municipio_id
    })

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = async() => {
      try {
          const result = await deleteEmpleado(empleadoID, empleadoMock)
          console.log(result)//result.message
          setOpen(false)
          setSnackStatus(true)
          setMessage(result.mensaje)
          //aqui volver a llamar al setEmpleados para que actualize el estado de empleados
          recargarEmpleados()
    }catch(error) {
        console.log("algo malio sal")
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Estas Seguro de que deseas eliminar este empleado?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCloseConfirm} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
      open={snackStatus}
      autoHideDuration={3000}
      onClose={() => setSnackStatus(false)}
      anchorOrigin={{vertical: 'bottom', horizontal:'right'}}>
        <Alert 
        onClose={() => {setSnackStatus(false)}}
        severity={'success'}
        sx={{width:"100%"}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
