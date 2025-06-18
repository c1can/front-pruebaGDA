import * as yup from 'yup'
import { subYears } from 'date-fns'

const fechaMinima = subYears(new Date(), 18)

export const yupEmpleadoSchema = yup.object().shape({
  nombres: yup.string().min(2).required("Los nombres son requeridos"),
  apellidos: yup.string().min(2).required("Los apellidos son requeridos"),
  fecha_nacimiento: yup.date().max(new Date(), "La fecha no puede ser futura").required("Fecha de nacimiento obligatoria").max(fechaMinima, 'Debes ser mayor a 18 años'),
  direccion: yup.string().required("La dirección es requerida"),
  telefono: yup.string().matches(/^[0-9]{8,15}$/, "Teléfono inválido").required("El teléfono es obligatorio"),
  correo_electronico: yup.string().email("Correo no válido").required("El correo es obligatorio"),
  departamento_id: yup.number().required("Seleccione un departamento"),
  municipio_id: yup.number().required("Seleccione un municipio"),
});
