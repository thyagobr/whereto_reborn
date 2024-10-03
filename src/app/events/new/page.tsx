"use client";

import { NewEventForm } from "@/components/forms/NewEventForm";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetPlaces } from "@/hooks/places/useGetPlaces";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewEvent() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { places, isLoading } = useGetPlaces();
  const [open, setOpen] = useState(false);

  const router = useRouter();

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
              className="w-[200px] justify-between"
            >
              {selectedPlace?.name || "Select a place"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search for a place" />
              <CommandList>
                <CommandEmpty>
                  <p className="mb-4">No place found.</p>
                  <Button
                    onClick={() => router.push(`/places/new?backToEvents=true`)}
                  >
                    Create one?
                  </Button>
                </CommandEmpty>
                <CommandGroup>
                  {places.map((place) => (
                    <CommandItem
                      key={place.id}
                      value={place}
                      onSelect={() => {
                        setSelectedPlace(place);
                        setOpen(false);
                      }}
                    >
                      {selectedPlace?.id === place.id && (
                        <Check className="mr-2 h-4 w-4" />
                      )}
                      {place.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedPlace && <NewEventForm placeId={selectedPlace.id} />}
    </div>
  );
}
