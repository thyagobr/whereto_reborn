import z from "zod";

export const NewPlaceFormSchema = z.object({
  name: z
    .string({ message: "Name of event is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  city: z
    .string({
      message: "City is required",
    })
    .nonempty({ message: "City is required" }),
  country: z
    .string({
      message: "Country is required",
    })
  .nonempty({ message: "Country is required" }),
  address: z
    .string({
      message: "Address is required",
    })
    .min(3, {
      message: "Address must be at least 3 characters long",
    }),
  tags: z
    .array(
      z.object({
        text: z.string(),
      })
    )
    .optional(),
});

export type NewPlaceFormSchema = z.infer<typeof NewPlaceFormSchema>;
