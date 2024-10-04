import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TagInput } from "../TagInput/TagInput";
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
import { NewPlaceFormSchema } from "./schemas/NewPlaceFormSchema";

export const NewPlaceForm = () => {
  const form = useForm({
    resolver: zodResolver(NewPlaceFormSchema),
    defaultValues: {
      name: "",
      address: "",
      tags: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const router = useRouter();

  const savePlace = async (data) => {
    const response = await fetch("http://localhost:3000/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      router.push(`/places/${responseData.id}`);
    }
  };

  return (
    <Form {...form}>
      <form
        id="event-form"
        onSubmit={handleSubmit(savePlace)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Place name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Place name..."
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
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  id="address"
                  type="text"
                  placeholder="Address..."
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Tags*</FormLabel>
        <TagInput />
        <Button type="submit">Add place</Button>
      </form>
    </Form>
  );
};
