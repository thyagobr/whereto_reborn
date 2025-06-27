"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { NewEventFormSchema } from "./schemas/NewEventFormSchema";
import { useCreateEvent } from "@/hooks/events/useCreateEvent";

// Helper to format a Date instance into the value expected by an <input type="datetime-local"> (YYYY-MM-DDTHH:MM)
const toDateTimeLocal = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const NewEventForm = ({ placeId = undefined }) => {
  // Calculate today's midday (12:00) once when the component mounts
  const middayToday = (() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return toDateTimeLocal(d);
  })();

  const form = useForm<NewEventFormSchema>({
    resolver: zodResolver(NewEventFormSchema),
    defaultValues: {
      name: "",
      start_at: middayToday,
      end_at: "",
      description: "",
      public: false
    },
  });

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { trigger } = useCreateEvent(placeId);

  const onSubmit = (data: NewEventFormSchema) => {
    if (isSubmitting) return;
    const dataToSubmit = {
      ...data,
      place_id: placeId,
    };

    console.log("Form submitted", dataToSubmit);
    saveEvent(dataToSubmit);
  };

  const saveEvent = (data) => {
    const event = {
      name: data.name,
      place_id: data.place_id,
      start_at: data.start_at,
      end_at: data.end_at,
      description: data.description,
      public: data.public
    };

    toast.promise(
      trigger(event)
      ,
      {
        loading: "Adding new event...",
        success: async (data) => {
          router.push(`/events/${data.id}`);

          return "Successfully added new event";
        },
        error: (error) => {
          console.log(error);
          return error.message;
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        id="event-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Event name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Event name..."
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_at"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Start at</FormLabel>
              <FormControl>
                <Input
                  id="start_at"
                  type="datetime-local"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_at"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>End at</FormLabel>
              <FormControl>
                <Input
                  id="end_at"
                  type="datetime-local"
                  disabled={isSubmitting}
                  {...field}
                />
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
                <Input
                  id="description"
                  type="text"
                  placeholder="Description..."
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="public"
          render={({ field }) => (
            <FormItem className="flex flex-row align-middle items-center gap-2">
              <FormControl>
                <Input
                  id="public"
                  type="checkbox"
                  disabled={isSubmitting}
                  className="h-4 w-4"
                  {...field}
                />
              </FormControl>
              <FormLabel className="align-middle">Public</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
