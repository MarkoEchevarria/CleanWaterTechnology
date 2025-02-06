import { z } from "zod"

const cursoSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    num_modulos: z.number().positive(),
})
export function validateCurso(curso) {
    return cursoSchema.safeParse(curso)
}