import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const handleGoToEmpleados = () => {
    navigate('/empleados');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Bienvenido al Panel de Inicio
        </Typography>
        <Typography variant="body1" gutterBottom>
          Usa el botón para navegar a la sección de empleados.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoToEmpleados}
        >
          Ir a Empleados
        </Button>
      </Box>
    </Container>
  );
}

