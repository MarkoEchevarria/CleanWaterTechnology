import { z } from "zod"

const cursoSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
})
export function validateCurso(curso) {
    return cursoSchema.safeParse(curso)
}