import { useEffect, useState } from "react"
import { initialEmployees } from "../mocks/empleados"
import { TarjetaEmpleado } from "./TarjetaEmpleado"
import { Grid, Box, Typography } from "@mui/material"
import { AccountBox } from "@mui/icons-material"
import { getEmpleados } from "../services/fetchEmpleados"

export function ListaEmpleados() {
    const [empleados, setEmpleados] = useState([])

    useEffect(() => {
        async function cargarEmpleados() {
            try {
                const data = await getEmpleados()
                setEmpleados(data)
            } catch (error) {
                console.log("Algo salio mal ", error)
            }
        }

        cargarEmpleados()
    }, [])


    return(
        <Box component="div">
            <Typography variant="h6" sx={{marginY: "20px", display: "flex", alignItems:"center", gap: 1}}>
                <AccountBox color="primary"/>
                Lista de Empleados
            </Typography>
            <Grid container spacing={3}>
                {empleados.map(empleado => (
                    <Grid key={empleado.telefono} size={{xs: 6, md: 4}}>
                        <TarjetaEmpleado empleado={empleado} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}