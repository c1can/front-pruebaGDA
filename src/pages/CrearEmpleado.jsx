import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { yupEmpleadoSchema } from '../validations/yupEmpleado';
import { getDepartamentos } from '../services/fetchDepartamentos';
import { postEmpleado } from '../services/fetchEmpleados';
import { AutocompleteDepartamento, AutocompleteMunicipio } from '../components/AutocompleteDepMun';

export function CrearEmpleado() {

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    activo: true,
    departamento_id: '',
    municipio_id: ''
  });

  const [tempSelect, setTempSelect] = useState({departamento: '', municipio: ''})

  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])

  const [open, setOpen] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoAlerta, setTipoAlerta] = useState('success')
  const [errores, setErrores] = useState({});

  useEffect(() => {
    async function cargarDepartamentos() {
      const data = await getDepartamentos()
      setDepartamentos(data)
    }

    cargarDepartamentos()
  }, [])

  const handleDepartamentoChange = (e, value) => {
    const departamentoSeleccionado = (value)
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

  const handleMunicipioChange = (e, value) => {
    const municipioSeleccionado = value
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
    let nuevosErrores = {};
    // Validación manual de campos requeridos
    if (!formData.nombres) nuevosErrores.nombres = 'Este campo es requerido';
    if (!formData.apellidos) nuevosErrores.apellidos = 'Este campo es requerido';
    if (!formData.fecha_nacimiento) nuevosErrores.fecha_nacimiento = 'Este campo es requerido';
    if (!formData.direccion) nuevosErrores.direccion = 'Este campo es requerido';
    if (!formData.telefono) nuevosErrores.telefono = 'Este campo es requerido';
    if (!formData.correo_electronico) nuevosErrores.correo_electronico = 'Este campo es requerido';
    if (!formData.departamento_id) nuevosErrores.departamento = 'Este campo es requerido';
    if (!formData.municipio_id) nuevosErrores.municipio = 'Este campo es requerido';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    try {
      const isValid = await yupEmpleadoSchema.validate(formData)
      console.log(isValid)   

      if(isValid) {
        const response = await postEmpleado(formData)
        console.log(response)
        setMensaje("Empleado agregado correctamente")
        setTipoAlerta('success')
        setOpen(true)
        setFormData({nombres: '',
          apellidos: '',
          fecha_nacimiento: '',
          direccion: '',
          telefono: '',
          correo_electronico: '',
          departamento_id: '',
          municipio_id: ''
        })
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
                        value={formData.nombres}
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
                        value={formData.apellidos}
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
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.fecha_nacimiento}
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
                value={formData.direccion}
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
                value={formData.telefono}
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
                value={formData.correo_electronico}
                onChange={handleChange}
                sx={{my: 2}}
                error={!!errores.correo_electronico}
              />
              {errores.correo_electronico && <div style={{color:'red', fontSize:13}}>{errores.correo_electronico}</div>}

              <Grid container spacing={2} sx={{mb: 2}}>
                <Grid size={6}>
                    {/* Departamento */}
                    <AutocompleteDepartamento
                      departamentos={departamentos}
                      value={tempSelect.departamento}
                      onChange={(nombre) => {
                        const departamentoFromEstado = departamentos.find(dep => dep.nombre === nombre);
                        setTempSelect({ ...tempSelect, departamento: nombre, municipio: '' });
                        setFormData({
                          ...formData,
                          departamento_id: departamentoFromEstado ? departamentoFromEstado.departamento_id : '',
                          municipio_id: ''
                        });
                        setMunicipios(departamentoFromEstado ? departamentoFromEstado.Municipios : []);
                      }}
                    />
                    {errores.departamento && <div style={{color:'red', fontSize:13}}>{errores.departamento}</div>}
                </Grid>
                <Grid size={6}>
                    {/* Municipio */}
                    <AutocompleteMunicipio
                      municipios={municipios}
                      value={tempSelect.municipio}
                      onChange={(nombre) => {
                        const municipiosFromEstado = municipios.find(muni => muni.nombre === nombre);
                        setTempSelect({ ...tempSelect, municipio: nombre });
                        setFormData({
                          ...formData,
                          municipio_id: municipiosFromEstado ? municipiosFromEstado.municipio_id : ''
                        });
                      }}
                      disabled={!formData.departamento_id}
                    />
                    {errores.municipio && <div style={{color:'red', fontSize:13}}>{errores.municipio}</div>}
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
