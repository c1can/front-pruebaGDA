import { DialogContent, Box,TextField, Grid, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { yupEmpleadoSchema } from '../validations/yupEmpleado';
import { editEmpleado } from '../services/fetchEmpleados';

export function EditarEmpleado({ open, setOpen, empleado, recargarEmpleados }) {

    const [empleadoMock, setEmpleadoMock] = useState({
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        fecha_nacimiento: empleado.fecha_nacimiento,
        direccion: empleado.direccion,
        telefono: empleado.telefono,
        correo_electronico: empleado.correo_electronico,
        departamento_id: empleado.departamento_id,
        municipio_id: empleado.municipio_id
    })

    const [localSnack, setLocalSnack] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const handleChange = e => {
        const nombreCampo = e.target.name
        const valorCampo = e.target.value

        setEmpleadoMock({
            ...empleadoMock,
            [nombreCampo]: valorCampo
        })
    }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
        const isValid = await yupEmpleadoSchema.validate(empleadoMock)

        if(isValid) {
            const response = await editEmpleado(empleado.empleado_id, empleadoMock)
            console.log(response)
            setMensaje(response.mensaje)
            setLocalSnack(true)
            recargarEmpleados()
        }
    } catch (error) {
       console.log(error) 
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
          Editar Empleado
        </DialogTitle>
        <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>

            <Grid container spacing={2}>
                <Grid size={6}>

                    {/* Nombres */}
                    <TextField
                        name="nombres"
                        label="Nombres"
                        fullWidth
                        required
                        defaultValue={empleado.nombres}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={6}>
                    {/* Apellidos */}
                    <TextField
                        name="apellidos"
                        label="Apellidos"
                        fullWidth
                        required
                        defaultValue={empleado.apellidos}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>


            {/* Fecha de nacimiento */}
              <TextField
                name="fecha_nacimiento"
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                required
                defaultValue={empleado.fecha_nacimiento}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Dirección */}
              <TextField
                name="direccion"
                label="Dirección"
                fullWidth
                required
                defaultValue={empleado.direccion}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Teléfono */}
              <TextField
                name="telefono"
                label="Teléfono"
                fullWidth
                required
                type="number"
                defaultValue={empleado.telefono}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Correo electrónico */}
              <TextField
                name="correo_electronico"
                label="Correo electrónico"
                fullWidth
                required
                defaultValue={empleado.correo_electronico}
                onChange={handleChange}
                sx={{my: 2}}
              />


            {/* Botón de enviar */}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Editar
              </Button>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Salir</Button>
        </DialogActions>
      </Dialog>


      <Snackbar 
      open={localSnack}
      autoHideDuration={3000}
      onClose={() => setLocalSnack(false)}
      anchorOrigin={{vertical: 'bottom', horizontal:'right'}}>
        <Alert 
        onClose={() => {setLocalSnack(false)}}
        severity={'success'}
        sx={{width:"100%"}}>
          {mensaje}
        </Alert>
      </Snackbar>
    </>
  );
}
