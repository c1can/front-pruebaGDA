import { Container, Box, Button } from "@mui/material"
import { ManageAccounts, Add, Home } from "@mui/icons-material"

export function HomeComponent() {

  return (
    <>
      <Container sx={{border: "1px solid red"}}>
        <Box sx={
          {
            border: "1px solid red",
            display: 'flex', 
            justifyContent:'space-between', 
            alignItems: 'center',
            p: 2,
          }} component={"header"}>
          <Box sx={{display: "flex", gap: '5px'}}>
            <ManageAccounts />
            <h1>Administrador de Empleados</h1>
          </Box>
          <Box>
              <Button startIcon={<Home />}>Lista de Empleados</Button>
              <Button startIcon={<Add />}>Nuevo Empleado</Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
