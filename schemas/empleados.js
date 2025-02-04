import { object, string } from "zod"

const empleadoSchema = object({
    nombre: string(),
    apellido: string(),
    dni: string().length(8),
    rol: string(),
    correo: string().email(),
})

export function validateEmpleado(empleado) {
    return empleadoSchema.safeParse(empleado)
}