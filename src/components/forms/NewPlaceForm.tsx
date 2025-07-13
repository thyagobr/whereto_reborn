import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TagInput } from "../TagInput/TagInput";
import { Button } from "../ui/button";
import fetcher from "@/services/fetcher";
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
import { useCreatePlace } from "@/hooks/places/useCreatePlace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const NewPlaceForm = ({ defaultName = "" } = {}) => {
  const form = useForm({
    resolver: zodResolver(NewPlaceFormSchema),
    defaultValues: {
      name: defaultName,
      address: "",
      city: "",
      country: "",
      tags: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const autofillAddress = async () => {
    const { name, city, country, address } = form.getValues();
    if (!name || !city || !country || address) return;
    try {
      const query = new URLSearchParams({ name, city, country, limit: "1" }).toString();
      const response = await fetcher({ url: `/places/search_open_maps?${query}`, params: { method: "GET" } });
      const place = response?.places?.[0];
      if (place && place.display_name) {
        form.setValue("address", place.display_name);
      }
    } catch (e) {
      // silent fail – address stays empty
    }
  };
  const router = useRouter();

  const { trigger } = useCreatePlace();

  const savePlace = async (data) => {
    const response = await trigger(data);
    router.push(`/places/${response.id}`);
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

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="natal">Natal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brasil">Brasil</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  onFocus={autofillAddress}
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
