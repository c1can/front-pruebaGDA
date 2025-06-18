import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { yupEmpleadoSchema } from '../validations/yupEmpleado';
import { getDepartamentos } from '../services/fetchDepartamentos';
import { postEmpleado } from '../services/fetchEmpleados';

export function CrearEmpleado() {

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    departamento_id: '',
    municipio_id: ''
  });

  const [tempSelect, setTempSelect] = useState({departamento: '', municipio: ''})

  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])

  const [open, setOpen] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoAlerta, setTipoAlerta] = useState('success')

  useEffect(() => {
    async function cargarDepartamentos() {
      const data = await getDepartamentos()
      setDepartamentos(data)
    }

    cargarDepartamentos()
  }, [])

  const handleDepartamentoChange = (e) => {
    const departamentoSeleccionado = (e.target.value)
    const departamentoFromEstado = departamentos.find((dep) => dep.nombre === departamentoSeleccionado)


    setTempSelect({
      ...tempSelect,
      departamento: departamentoFromEstado.nombre
    })

    setFormData({
      ...formData,
      departamento_id: departamentoFromEstado.departamento_id,
      municipio_id: ''
    })

    setMunicipios(departamentoFromEstado.Municipios)
  }

  const handleMunicipioChange = (e) => {
    const municipioSeleccionado = e.target.value
    const municipiosFromEstado = municipios.find(muni => muni.nombre === municipioSeleccionado)
    
    setTempSelect({
      ...tempSelect,
      municipio: municipiosFromEstado.nombre
    })

    setFormData({
      ...formData,
      municipio_id: municipiosFromEstado.municipio_id
    })

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(`Nombre: ${name}, value: ${value}`)
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const isValid = await yupEmpleadoSchema.validate(formData)
      //console.log(isValid)   

      if(isValid) {
        const response = await postEmpleado(formData)
        console.log(response)
        setMensaje("Empleado agregado correctamente")
        setTipoAlerta('success')
        setOpen(true)
        //console.log("datos enviados")
      }
    } catch (error) {
      console.log(error)
      setMensaje("Error al agregar empleado")
      setTipoAlerta("error")
      setOpen(false)
    }


    //console.log('Formulario enviado:', formData);
  };

  return (
    <Box
      component="section"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f4f4"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Button variant='contained' sx={{mb: 2}}>
          <Link to="/empleados">
            Regresar
          </Link>
        </Button>

        <Box component="form" onSubmit={handleSubmit}>

            <Grid container spacing={2}>
                <Grid size={6}>

                    {/* Nombres */}
                    <TextField
                        name="nombres"
                        label="Nombres"
                        fullWidth
                        required
                        value={formData.nombres}
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
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>


            {/* Fecha de nacimiento */}
              <TextField
                name="fecha_nacimiento"
                label="Fecha de nacimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Dirección */}
              <TextField
                name="direccion"
                label="Dirección"
                fullWidth
                required
                value={formData.direccion}
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
                value={formData.telefono}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Correo electrónico */}
              <TextField
                name="correo_electronico"
                label="Correo electrónico"
                fullWidth
                required
                value={formData.correo_electronico}
                onChange={handleChange}
                sx={{my: 2}}
              />

              <Grid container spacing={2}>
                <Grid size={6}>
                    {/* Departamento */}
                    <TextField
                        name="departamento"
                        label="Departamento"
                        select
                        fullWidth
                        required
                        value={tempSelect.departamento}
                        onChange={handleDepartamentoChange}
                        sx={{my: 2}}
                    >
                        {departamentos.map(({departamento_id, nombre}) => (
                        <MenuItem key={departamento_id} value={nombre}>
                            {nombre}
                        </MenuItem>
                        ))}
                    </TextField>

                </Grid>
                <Grid size={6}>

                    {/* Municipio */}
                    <TextField
                        name="municipio"
                        label="Municipio"
                        select
                        fullWidth
                        required
                        value={tempSelect.municipio}
                        onChange={handleMunicipioChange}
                        disabled={!formData.departamento_id}
                        sx={{my: 2}}
                    >
                        {municipios.map(({nombre}) => (
                        <MenuItem key={nombre} value={nombre}>
                            {nombre}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid>
              </Grid>



            {/* Botón de enviar */}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Registar
              </Button>
        </Box>
      </Paper>


      <Snackbar 
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{vertical: 'bottom', horizontal:'right'}}>
        <Alert 
        onClose={() => {setOpen(false)}}
        severity={tipoAlerta}
        sx={{width:"100%"}}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}
