import z from "zod";

export const EditPlaceFormSchema = z.object({
  name: z
    .string({ message: "Name of place is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  city: z
    .string({ message: "City is required" })
    .min(1, { message: "City is required" }),
  country: z
    .string({ message: "Country is required" })
    .min(1, { message: "Country is required" }),
  address: z
    .string({ message: "Address is required" })
    .min(3, { message: "Address must be at least 3 characters long" }),
  tags: z
    .array(z.object({ text: z.string() }))
    .optional(),
});

export type EditPlaceFormSchema = z.infer<typeof EditPlaceFormSchema>;
