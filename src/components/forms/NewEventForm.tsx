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

export const NewEventForm = ({ placeId = undefined }) => {
  const form = useForm<NewEventFormSchema>({
    resolver: zodResolver(NewEventFormSchema),
    defaultValues: {
      name: "",
      start_at: "",
      end_at: "",
      description: "",
    },
  });

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

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
    };

    toast.promise(
      fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }),
      {
        loading: "Adding new event...",
        success: async (data) => {
          const responseData = await data.json();
          router.push(`/events/${responseData.id}`);

          return "Successfully added new event";
        },
        error: (error) => {
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

        <Button type="submit" className="mt-5" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
