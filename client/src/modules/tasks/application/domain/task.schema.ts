import { z } from "zod";

export const TaskSchema = z.object({
  title: z
    .string()
    .nonempty()
    .max(50, "Máximo 50 caracteres"),
  description: z
    .string()
    .nonempty()
    .max(150, "Máximo 150 caracteres"),
  dueDate: z
    .date()
    .min(new Date(), { error: "Debe ser mayor a hoy." }),
});
