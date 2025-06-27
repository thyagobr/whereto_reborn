"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewSquadFormSchema } from "./schemas/NewSquadFormSchema";
import { useCreateCrew } from "@/hooks/crews/useCreateCrew";

export const NewSquadForm = () => {
  const form = useForm<NewSquadFormSchema>({
    resolver: zodResolver(NewSquadFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const router = useRouter();
  const { trigger, isLoading } = useCreateCrew();

  const onSubmit = (data: NewSquadFormSchema) => {
    if (isLoading) return;
    toast.promise(trigger(data as any), {
      loading: "Creating crew...",
      success: () => {
        form.reset();
        router.refresh();
        return "Crew created";
      },
      error: (err) => err.message || "Error",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Crew name</FormLabel>
              <FormControl>
                <Input placeholder="My awesome crew" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Describe your crew (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Create crew
        </Button>
      </form>
    </Form>
  );
}; 
