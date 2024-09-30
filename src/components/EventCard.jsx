import { useRouter } from "next/navigation";
import { PlaceTag } from "@/components/place_tag";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator"

export function EventCard({ event }) {
  const router = useRouter();
  const event_clicked = (event) => {
    router.push(`/events/${event.id}`);
  };

  return (
    <Card
      key={event.id}
      className="w-full max-w-[450px] cursor-pointer"
    >
      <CardHeader>
        <div className="text-2xl" onClick={() => event_clicked(event)}>
          {event.name}
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {event.date}
        </div>
        <div className="text-xl">
          {event.place.name}
        </div>
        <a
          href={`https://www.google.com/maps/search/${event.place.name}+${event.place.address}`}
          target="_blank"
        >
          {event.place.address}
        </a>
        <Separator className="mt-4"/>
        <div className="flex mt-3 gap-2">
        {event.place.tags.map((tag) => (
            <PlaceTag tag={tag} key={tag.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
