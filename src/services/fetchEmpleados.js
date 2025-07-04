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


export async function postEmpleado(body) {
    try {
        const response = await fetch(`${apiURL}/api/empleados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`Algo salio mal al querer agregar un empleado nuevo ${error}`)
    }
}


export async function deleteEmpleado(id, body) {
    try {
        const response = await fetch(`${apiURL}/api/empleados/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`Algo salio mal al querer eliminar usuario: ${error}`)
    }
}

export async function editEmpleado(id, body) {
    try {
        const response = await fetch(`${apiURL}/api/empleados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`Algo salio mal al querer editar el usuario ${error}`)
    }
}