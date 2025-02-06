import { z } from "zod"

const empleadoSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    dni: z.string().length(8),
    rol: z.string(),
    correo: z.string().email(),
})

export function validateEmpleado(empleado) {
    return empleadoSchema.safeParse(empleado)
}