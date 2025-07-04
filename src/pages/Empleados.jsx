import {
  Container,
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
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
import { AutocompleteDepartamento, AutocompleteMunicipio } from '../components/AutocompleteDepMun';


export function Empleados () {


  const [departamentos, setDepartamentos] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [tempSelect, setTempSelect] = useState({departamento: '', municipio: ''})
  const [filtro, setFiltro] = useState('')
  
  const handleDepartamentoChange = (e) => {
    const departamentoSeleccionado = e.target.value
    
    /**Esto lo hago para poder recuperar el el objeto completo del departamento
     * seleccionado ya que necesito el objeto municipios anidaddo
     */
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
    <Container maxWidth="lg" sx={{pb: 6}}>
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
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </Grid>
          
          <Grid sx={{width:"150px"}}>
              <AutocompleteDepartamento
                departamentos={departamentos}
                value={tempSelect.departamento}
                onChange={(nombre) => {
                  const departamentoFromEstado = departamentos.find(dep => dep.nombre === nombre);
                  setTempSelect({...tempSelect, departamento: nombre, municipio: ''});
                  setMunicipios(departamentoFromEstado ? departamentoFromEstado.Municipios : []);
                }}
              />
          </Grid>
          
          <Grid sx={{width:"150px"}}>
              <AutocompleteMunicipio
                municipios={municipios}
                value={tempSelect.municipio}
                onChange={(nombre) => setTempSelect({...tempSelect, municipio: nombre})}
                disabled={!tempSelect.departamento}
              />
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

        <ListaEmpleados filtro={filtro} filtroDepYMuni={tempSelect} />
    </Container>
  );
};