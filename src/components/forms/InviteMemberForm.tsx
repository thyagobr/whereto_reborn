"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useInviteMember } from "@/hooks/crews/useInviteMember";
import { toast } from "sonner";
import z from "zod";

const InviteSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

type InviteSchema = z.infer<typeof InviteSchema>;

export const InviteMemberForm = ({ crewId }: { crewId: number | string }) => {
  const form = useForm<InviteSchema>({
    resolver: zodResolver(InviteSchema),
    defaultValues: { email: "" },
  });

  const { trigger, isMutating } = useInviteMember(crewId);

  const onSubmit = (data: InviteSchema) => {
    if (isMutating) return;
    toast.promise(trigger({ crew_membership: { email: data.email } } as any), {
      loading: "Sending invite...",
      success: () => {
        form.reset();
        return "Invite sent";
      },
      error: (err) => err.message || "Error",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input placeholder="Friend's email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isMutating}>
          Invite
        </Button>
      </form>
    </Form>
  );
}; 
