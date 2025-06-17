import { useEffect, useState } from "react"
import { initialEmployees } from "../mocks/empleados"
import { TarjetaEmpleado } from "./TarjetaEmpleado"
import { Grid, Box, Typography } from "@mui/material"
import { AccountBox } from "@mui/icons-material"

export function ListaEmpleados() {
    const [employees, setEmployees] = useState(initialEmployees)

    useEffect(() => {
        console.log(employees)
    }, [])


    return(
        <Box component="div">
            <Typography variant="h6" sx={{marginY: "20px", display: "flex", alignItems:"center", gap: 1}}>
                <AccountBox color="primary"/>
                Lista de Empleados
            </Typography>
            <Grid container spacing={3}>
                {employees.map((employee, index) => <>
                    <Grid item size={{xs: 6, md: 4}} key={employee.id}>
                        <TarjetaEmpleado employee={employee}/>
                    </Grid>
                </>)}
            </Grid>
        </Box>
    )
}