const apiURL = import.meta.env.VITE_API_URL


export async function getEmpleados() {
    try {
        const response = await fetch(`${apiURL}/api/empleados`)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(`Algo salio mal al consultar los datos, error: ${error}`)
    }
}