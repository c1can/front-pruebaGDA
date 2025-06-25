import { useEffect, useState } from "react"
import { TarjetaEmpleado } from "./TarjetaEmpleado"
import { Grid, Box, Typography } from "@mui/material"
import { AccountBox } from "@mui/icons-material"
import { getEmpleados } from "../services/fetchEmpleados"

export function ListaEmpleados({ filtro, filtroDepYMuni }) {

    const [empleados, setEmpleados] = useState([])

    async function cargarEmpleados() {
        try {
            const data = await getEmpleados()
            setEmpleados(data)
        } catch (error) {
            console.log(`Algo salio mal ${error}`)
        }
    }
    
    useEffect(() => {
        cargarEmpleados()
    }, [])
    
    //filtroDepYMuni = {departamento: '', municipio: ''}
    const { departamento, municipio } = filtroDepYMuni

    const empleadosFiltrados = empleados.filter(empleado => {

        const textoCompleto = `${empleado.nombres} ${empleado.apellidos}`

        const coincideNombre = textoCompleto.toLowerCase().includes(filtro.toLowerCase());
        const coincideDepartamento = departamento ? empleado.Departamento.nombre === departamento :true
        const coincideMunicipio = municipio ? empleado.Municipio.nombre === municipio: true
        const estaActivo = empleado.activo === true


       return coincideNombre && coincideDepartamento && coincideMunicipio && estaActivo
    })


    return(
        <Box component="div">
            <Typography variant="h6" sx={{marginY: "20px", display: "flex", alignItems:"center", gap: 1}}>
                <AccountBox color="primary"/>
                Lista de Empleados
            </Typography>
            <Grid container spacing={3}>
                {empleadosFiltrados.map(empleado => (
                    <Grid key={empleado.empleado_id} size={{xs: 6, md: 4}}>
                        <TarjetaEmpleado empleado={empleado} fetchEmpleados={cargarEmpleados}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}