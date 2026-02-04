"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { EditPlaceFormSchema } from "./schemas/EditPlaceFormSchema";
import { useEditPlace } from "@/hooks/places/useEditPlace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

type Place = {
  id: string;
  name: string;
  address: string;
  city?: string;
  country?: string;
  tags: { id?: string; text: string }[];
};

export const EditPlaceForm = ({ place }: { place: Place }) => {
  const form = useForm({
    resolver: zodResolver(EditPlaceFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
      tags: [] as { text: string }[],
    },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const { trigger } = useEditPlace(place?.id);

  const autofillAddress = async () => {
    const { name, city, country, address } = form.getValues();
    if (!name || !city || !country || address) return;
    try {
      const query = new URLSearchParams({ name, city, country, limit: "1" }).toString();
      const response = await fetcher({ url: `/places/search_address?${query}`, params: { method: "GET" } });
      const results = response.data;
      const displayName = results[0]?.display_name;
      if (displayName) {
        form.setValue("address", displayName);
      }
    } catch (e) {
      // silent fail
    }
  };

  useEffect(() => {
    if (place) {
      console.log("Resetting form with place data:", place);
      const city = (place.city ?? "").toString().toLowerCase();
      const country = (place.country ?? "").toString().toLowerCase();
      console.log("City:", city, "Country:", country);
      reset({
        name: place.name,
        address: place.address,
        city: city || "",
        country: country || "",
        tags: place.tags?.map((t) => ({ text: t.text })) ?? [],
      });
        setValue("city", city);
        setValue("country", country);
    }
  }, [place, reset]);

  const onSubmit = (data: EditPlaceFormSchema) => {
    if (isSubmitting) return;
    toast.promise(trigger(data), {
      loading: "Updating place...",
      success: () => {
        router.push(`/places/${place.id}`);
        return "Place updated";
      },
      error: (err) => err?.message ?? "Failed to update place",
    });
  };

  return (
    <Form {...form}>
      <form
        id="place-edit-form"
        onSubmit={handleSubmit(onSubmit)}
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
            defaultValue=""
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value === "" ? undefined : field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value === "" ? undefined : field.value}
                  >
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

        <FormLabel>Tags</FormLabel>
        <TagInput defaultTags={place?.tags?.map((t) => ({ text: t.text }))} />

        <Button type="submit" className="mt-5" disabled={isSubmitting}>
          Save changes
        </Button>
      </form>
    </Form>
  );
};
