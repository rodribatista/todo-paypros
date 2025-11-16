import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(4, "Mínimo 4 caracteres")
    .max(24, "Máximo 24 caracteres")
    .regex(/^\S+$/, "El nombre de usuario no puede contener espacios"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(24, "Máximo 24 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
});
