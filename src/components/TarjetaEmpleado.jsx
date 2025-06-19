import {
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Stack,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { AlertaEliminar } from './AlertaEliminar';


export const TarjetaEmpleado = ({empleado, fetchEmpleados }) =>{


  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              bgcolor: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h3" fontWeight="bold">
              {empleado.nombres} {empleado.apellidos}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {empleado.Municipio.nombre}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {empleado.correo_electronico}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {empleado.telefono}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {empleado.direccion}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Nacimiento: {formatDate(empleado.fecha_nacimiento)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <Box sx={{ 
        p: 2, 
        pt: 0, 
        display: 'flex', 
        justifyContent: 'flex-end',
        gap: 1
      }}>
        <IconButton
          onClick={() => onEdit(empleado)}
          color="primary"
          size="small"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'primary.main',
              color: 'white'
            }
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={handleClick}
          color="error"
          size="small"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'error.main',
              color: 'white'
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <AlertaEliminar open={open} setOpen={setOpen} empleadoID={empleado.empleado_id} recargarEmpleados={fetchEmpleados}/>
    </Card>
  );
};