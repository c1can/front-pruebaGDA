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


export function Empleados () {

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
            <FormControl fullWidth>
              <InputLabel>Departamento</InputLabel>
              <Select
                label="Departamento"
              >
                <MenuItem>Todo fetch Departamentos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid sx={{width:"150px"}}>
            <FormControl fullWidth>
              <InputLabel>Municipios</InputLabel>
              <Select label="Municipios">
                  <MenuItem>fetch municipios</MenuItem>
              </Select>
            </FormControl>
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
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {
                    /**
                     * getFilterSummary().map((filter, index) => (
                <Chip
                  key={index}
                  label={filter}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))
                     */
                }
              
            </Stack>
          </Box>
        )}
      </Paper>

        <ListaEmpleados />
    </Container>
  );
};