import z from "zod";

export const EditEventFormSchema = z.object({
  place_id: z.number().optional(),
  name: z
    .string({ message: "Name of event is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  start_at: z.string().min(1, { message: "Start date is required" }),
  end_at: z.string().optional(),
  description: z.string({}).optional(),
  tags: z.array(z.string()).optional(),
  public: z.boolean()
});

export type EditEventFormSchema = z.infer<typeof EditEventFormSchema>;
