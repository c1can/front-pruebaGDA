import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
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


export const TarjetaEmpleado = ({employee}) =>{

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
            src={employee.avatar}
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              bgcolor: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            {employee.firstName[0]}{employee.lastName[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h3" fontWeight="bold">
              {employee.firstName} {employee.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employee.position}
            </Typography>
          </Box>
          <Chip
            label={employee.status === 'active' ? 'Activo' : 'Inactivo'}
            color={employee.status === 'active' ? 'success' : 'default'}
            size="small"
            sx={{ 
              fontWeight: 'medium',
              textTransform: 'capitalize'
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {employee.email}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {employee.phone}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {employee.department}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Contratado: {formatDate(employee.hireDate)}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {employee.salary}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Salario anual
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ 
        p: 2, 
        pt: 0, 
        display: 'flex', 
        justifyContent: 'flex-end',
        gap: 1
      }}>
        <IconButton
          onClick={() => onEdit(employee)}
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
          onClick={() => onDelete(employee.id)}
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
    </Card>
  );
};