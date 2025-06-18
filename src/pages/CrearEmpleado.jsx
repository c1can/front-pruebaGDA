import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';
import { yupEmpleadoSchema } from '../validations/yupEmpleado';
import { getDepartamentos } from '../services/fetchDepartamentos';

export function CrearEmpleado() {

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    departamento: '',
    municipio: ''
  });

  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])

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

    setFormData({
      ...formData,
      departamento: departamentoFromEstado.nombre,
      municipio: ''
    })
    console.log(departamentoFromEstado.departamento_id)

    setMunicipios(departamentoFromEstado?.Municipios || [])
  }

  const handleMunicipioChange = (e) => {
    const municipioSeleccionado = e.target.value
    const municipiosFromEstado = municipios.find(muni => muni.nombre === municipioSeleccionado)
    
    setFormData({
      ...formData,
      municipio: municipiosFromEstado.nombre
    })

    console.log(municipiosFromEstado.municipio_id)
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
      console.log(isValid)   

      if(isValid) {
        console.log("datos enviados")
      }
    } catch (error) {
      console.log(error)
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
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Formulario de Registro
        </Typography>

        <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>
                <Grid size={6}>

                    {/* Nombres */}
                    <TextField
                        name="nombres"
                        label="Nombres"
                        fullWidth
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
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Dirección */}
              <TextField
                name="direccion"
                label="Dirección"
                fullWidth
                value={formData.direccion}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Teléfono */}
              <TextField
                name="telefono"
                label="Teléfono"
                fullWidth
                value={formData.telefono}
                onChange={handleChange}
                sx={{my: 2}}
              />

            {/* Correo electrónico */}
              <TextField
                name="correo_electronico"
                label="Correo electrónico"
                fullWidth
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
                        value={formData.departamento}
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
                        value={formData.municipio}
                        onChange={handleMunicipioChange}
                        disabled={!formData.departamento}
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
                Enviar
              </Button>
        </form>
      </Paper>
    </Box>
  );
}
