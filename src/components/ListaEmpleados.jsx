import { useEffect, useState } from "react"
import { TarjetaEmpleado } from "./TarjetaEmpleado"
import { Grid, Box, Typography } from "@mui/material"
import { AccountBox } from "@mui/icons-material"
import { getEmpleados } from "../services/fetchEmpleados"

export function ListaEmpleados({ filtro, filtroDepYMuni }) {

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
    
    //filtroDepYMuni = {departamento: '', municipio: ''}
    const { departamento, municipio } = filtroDepYMuni

    const empleadosFiltrados = empleados.filter(empleado => {

        const textoCompleto = `${empleado.nombres} ${empleado.apellidos}`

        const coincideNombre = textoCompleto.toLowerCase().includes(filtro.toLowerCase());
        const coincideDepartamento = departamento ? empleado.Departamento.nombre === departamento :true
        const coincideMunicipio = municipio ? empleado.Municipio.nombre === municipio: true


       return coincideNombre && coincideDepartamento && coincideMunicipio
    })


    return(
        <Box component="div">
            <Typography variant="h6" sx={{marginY: "20px", display: "flex", alignItems:"center", gap: 1}}>
                <AccountBox color="primary"/>
                Lista de Empleados
            </Typography>
            <Grid container spacing={3}>
                {empleadosFiltrados.map(empleado => (
                    <Grid key={empleado.telefono} size={{xs: 6, md: 4}}>
                        <TarjetaEmpleado empleado={empleado} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}