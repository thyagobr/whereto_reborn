import z from "zod";

export const NewEventFormSchema = z.object({
  placeId: z.number().optional(),
  name: z
    .string({ message: "Name of event is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  startsAt: z.string().min(1, { message: "Start date is required" }),
  endsAt: z.string().optional(),
  description: z.string({}).optional(),
  tags: z.array(z.string()).optional(),
  public: z.boolean()
});

export type NewEventFormSchema = z.infer<typeof NewEventFormSchema>;
