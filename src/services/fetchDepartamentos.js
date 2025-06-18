const apiURL = import.meta.env.VITE_API_URL

export async function getDepartamentos() {
    try {
        const response = await fetch(`${apiURL}/api/departamentos`)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
}