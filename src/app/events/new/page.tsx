"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useGetPlaces } from "@/hooks/places/useGetPlaces"
import { Link } from "next/link"
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function NewEvent() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const { places, error, isLoading } = useGetPlaces();
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      start_at: "",
      end_at: "",
      description: "",
      tags: []
    },
  });
  const { control, register, setValue, handleSubmit, formState: { errors } } = form

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  const placeSelected = (place) => {
    setSelectedPlace(places.find(p => p.id === place));
    setShowEventForm(true);
  }

  useEffect(() => {
    console.log("selectedPlace", selectedPlace);
  }, [selectedPlace]);

  useEffect(() => {
    register("place_id")
  }, [register])

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="mb-10">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedPlace ? selectedPlace.name : "Select a place"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search for a place"/>
              <CommandList>
                <CommandEmpty>
                  <p className="mb-4">No place found.</p>
                  <Button onClick={() => router.push(`/places/new?backToEvents=true`)}>Create one?</Button>
                </CommandEmpty>
                <CommandGroup>
                  {places.map((place) => (
                    <CommandItem
                      key={place.id}
                      value={place.name}
                      onSelect={(currentValue) => {
                        console.log(currentValue)
                        const place = places.find(p => p.name === currentValue)
                        if (!place) {
                          console.error("Place not found")
                          return
                        }
                        setValue("place_id", place.id)
                        placeSelected(place.id)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedPlace && selectedPlace.id === place.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {place.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
