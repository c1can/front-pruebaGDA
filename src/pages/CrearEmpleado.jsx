import { useState } from 'react';
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

const departamentos = ['San Salvador', 'La Libertad', 'Santa Ana'];
const municipios = {
  'San Salvador': ['San Salvador', 'Soyapango', 'Mejicanos'],
  'La Libertad': ['Santa Tecla', 'Antiguo Cuscatlán'],
  'Santa Ana': ['Santa Ana', 'Metapán']
};

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
                        onChange={handleChange}
                        sx={{my: 2}}
                    >
                        {departamentos.map((dep) => (
                        <MenuItem key={dep} value={dep}>
                            {dep}
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
                        onChange={handleChange}
                        disabled={!formData.departamento}
                        sx={{my: 2}}
                    >
                        {(municipios[formData.departamento] || []).map((mun) => (
                        <MenuItem key={mun} value={mun}>
                            {mun}
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
