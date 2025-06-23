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
    const [errores, setErrores] = useState({})

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
    e.preventDefault();
    let nuevosErrores = {};
    if (!empleadoMock.nombres) nuevosErrores.nombres = 'Este campo es requerido';
    if (!empleadoMock.apellidos) nuevosErrores.apellidos = 'Este campo es requerido';
    if (!empleadoMock.fecha_nacimiento) nuevosErrores.fecha_nacimiento = 'Este campo es requerido';
    if (!empleadoMock.direccion) nuevosErrores.direccion = 'Este campo es requerido';
    if (!empleadoMock.telefono) nuevosErrores.telefono = 'Este campo es requerido';
    if (!empleadoMock.correo_electronico) nuevosErrores.correo_electronico = 'Este campo es requerido';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
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
                        defaultValue={empleado.nombres}
                        onChange={handleChange}
                        error={!!errores.nombres}
                    />
                    {errores.nombres && <div style={{color:'red', fontSize:13}}>{errores.nombres}</div>}
                </Grid>

                <Grid size={6}>
                    {/* Apellidos */}
                    <TextField
                        name="apellidos"
                        label="Apellidos"
                        fullWidth
                        defaultValue={empleado.apellidos}
                        onChange={handleChange}
                        error={!!errores.apellidos}
                    />
                    {errores.apellidos && <div style={{color:'red', fontSize:13}}>{errores.apellidos}</div>}
                </Grid>
            </Grid>


            {/* Fecha de nacimiento */}
              <TextField
                name="fecha_nacimiento"
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                defaultValue={empleado.fecha_nacimiento}
                onChange={handleChange}
                sx={{my: 2}}
                error={!!errores.fecha_nacimiento}
              />
              {errores.fecha_nacimiento && <div style={{color:'red', fontSize:13}}>{errores.fecha_nacimiento}</div>}

            {/* Dirección */}
              <TextField
                name="direccion"
                label="Dirección"
                fullWidth
                defaultValue={empleado.direccion}
                onChange={handleChange}
                sx={{my: 2}}
                error={!!errores.direccion}
              />
              {errores.direccion && <div style={{color:'red', fontSize:13}}>{errores.direccion}</div>}

            {/* Teléfono */}
              <TextField
                name="telefono"
                label="Teléfono"
                fullWidth
                type="number"
                defaultValue={empleado.telefono}
                onChange={handleChange}
                sx={{my: 2}}
                error={!!errores.telefono}
              />
              {errores.telefono && <div style={{color:'red', fontSize:13}}>{errores.telefono}</div>}

            {/* Correo electrónico */}
              <TextField
                name="correo_electronico"
                label="Correo electrónico"
                fullWidth
                defaultValue={empleado.correo_electronico}
                onChange={handleChange}
                sx={{my: 2}}
                error={!!errores.correo_electronico}
              />
              {errores.correo_electronico && <div style={{color:'red', fontSize:13}}>{errores.correo_electronico}</div>}


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
