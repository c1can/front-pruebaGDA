import {
  Container,
  Box,
  Grid,
  InputLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Paper,
  Stack,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { ListaEmpleados } from '../components/ListaEmpleados';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDepartamentos } from '../services/fetchDepartamentos';


export function Empleados () {


  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [tempSelect, setTempSelect] = useState({departamento: '', municipio: ''})
  
  const handleDepartamentoChange = (e) => {
    const departamentoSeleccionado = e.target.value
    const departamentoFromEstado = departamentos.find(dep => dep.nombre === departamentoSeleccionado)

    setTempSelect({...tempSelect, departamento: departamentoSeleccionado})

    setMunicipios(departamentoFromEstado.Municipios)
  }

  const handleMunicipioChange = e => {
    const municipioSeleccionado = e.target.value

    setTempSelect({
      ...tempSelect,
      municipio: municipioSeleccionado
    })
  }


  useEffect(() => {
    async function cargarDepartamentos() {
      const data = await getDepartamentos()
      setDepartamentos(data)
    }

    cargarDepartamentos()
  }, [])

  return (
    <Container maxWidth="lg">
      {/* Seccion de Filtros*/}
      <Paper elevation={1} sx={{py: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon color="primary" />
          Filtros de Búsqueda
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <TextField
              fullWidth
              placeholder="Buscar empleados..."
              //value={searchTerm}
              //onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          
          <Grid sx={{width:"150px"}}>
              <TextField
                name='departamento'
                label="Departamento"
                select
                fullWidth
                value={tempSelect.departamento}
                onChange={handleDepartamentoChange}
              >
                {
                  departamentos.map(({departamento_id, nombre}) => (
                    <MenuItem key={departamento_id} value={nombre}>{nombre}</MenuItem>
                  ))
                }
              </TextField>
          </Grid>
          
          <Grid sx={{width:"150px"}}>
              <TextField 
              name="municipios"
              label="Municipios"
              select
              value={tempSelect.municipio}
              fullWidth
              disabled={!tempSelect.departamento}
              onChange={handleMunicipioChange}
              >
                  {
                    municipios.map(({nombre}) => (
                      <MenuItem key={nombre} value={nombre}>{nombre}</MenuItem>
                    ))
                  }
              </TextField>
          </Grid>

          <Grid sx={{marginLeft: 'auto'}}>
            <Button variant='contained'>
              <Link to="nuevo/">Agregar Empleado</Link>
            </Button>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {[].length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Filtros activos:
            </Typography>
          </Box>
        )}
      </Paper>

        <ListaEmpleados />
    </Container>
  );
};