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
import { EditEventFormSchema } from "./schemas/EditEventFormSchema";
import { useEditEvent } from "@/hooks/events/useEditEvent";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useEffect } from "react";

export const EditEventForm = ({ event }) => {
  const form = useForm<EditEventFormSchema>({
    resolver: zodResolver(EditEventFormSchema),
    defaultValues: {
      name: "",
      start_at: "",
      end_at: "",
      description: "",
      public: false
    },
  });

  const placeId = event.place_id;
  const eventId = event.id;

  const router = useRouter();

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = form;

  const isPublic = watch("public");

  const { trigger } = useEditEvent(eventId);

  const onSubmit = (data: EditEventFormSchema) => {
    if (isSubmitting) return;
    const dataToSubmit = {
      ...data,
      place_id: placeId,
    };

    console.log("Form submitted", dataToSubmit);
    updateEvent(dataToSubmit);
  };

  useEffect(() => {
    if (event) {
      reset({
        name: event.name,
        start_at: event.start_at,
        description: event.description,
        public: !!event.public,
      });
    }
  }, [event, reset]);

  const updateEvent = (data) => {
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
        loading: "Editing event...",
        success: async (data) => {
          const { id } = data.events[0];
          router.push(`/events/${id}`);

          return "Successfully edited the event";
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
                  checked={!!isPublic}
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
