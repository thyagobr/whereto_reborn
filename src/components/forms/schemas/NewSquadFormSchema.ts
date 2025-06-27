import z from "zod";

export const NewSquadFormSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().optional(),
});

export type NewSquadFormSchema = z.infer<typeof NewSquadFormSchema>; 
