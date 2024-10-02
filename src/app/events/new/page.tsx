"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { useGetPlaces } from "@/hooks/places/useGetPlaces"

export default function NewEvent() {
  const [place, setPlace] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const { places, error, isLoading } = useGetPlaces();

  const form = useForm({
    defaultValues: {
      name: "",
      start_at: "",
      end_at: "",
      description: "",
      tags: []
    },
  });
  const { control, register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data) => {
    data['place_id'] = place.id;
    console.log("Form submitted", data);
  };

  const placeSelected = (place) => {
    setPlace(places.find(p => p.id === place));
    setShowEventForm(true);
  }

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="mb-10">
        <Select onValueChange={(place) => placeSelected(place)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a place" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {places.map((place) => (
                <SelectItem key={place.id} value={place.id}>{place.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {showEventForm && (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input type="name" {...field} />
                  </FormControl>
                  {errors && <FormMessage>{errors.email?.message}</FormMessage>}
                </FormItem>
              )}/>

            <FormField
              control={control}
              name="start_at"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Start at</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...register("start_at")} />
                  </FormControl>
                  {errors && <FormMessage>{errors.start_at?.message}</FormMessage>}
                </FormItem>
              )}/>

            <FormField
              control={control}
              name="end_at"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>End at</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...register("end_at")} />
                  </FormControl>
                  {errors && <FormMessage>{errors.end_at?.message}</FormMessage>}
                </FormItem>
              )}/>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" {...register("description")} />
                  </FormControl>
                  {errors && <FormMessage>{errors.description?.message}</FormMessage>}
                </FormItem>
              )}/>

            <Button type="submit" className="mt-5">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  )
}
