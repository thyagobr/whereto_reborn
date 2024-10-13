"use client"
import { Card } from "@/components/ui/card";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlaceTag } from "@/components/place_tag";
import { Chat } from "@/components/chat";

export default function ShowEvent({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [chat, setChat] = useState(null);

  const { events, error, isLoading } = useGetEvent(id);

  useEffect(() => {
    if (!events) return;
    setEvent(events[0]);
  }, [events]);

  if (!events) {
    return <h1 className="text-white">Loading...</h1>;
  }

  if (!event) {
    return <h1 className="text-white">Event not found</h1>;
  }

  return (
    <div className="flex flex-col">
      <Card className="w-full max-w-[450px] mx-auto p-5">
        <div className="flex flex-col items-center px-5 py-10 gap-3">
          <h2 className="text-center w-full text-2xl neon_cyan_text">
            {event.name}
          </h2>
          <p>{event.date}</p>
          <p>{event.place.name}</p>
          <p className="text-center w-full text-sm">{event.place.address}</p>
          <a
            href={`https://www.google.com/maps/search/${event.place.name}+${event.place.address}`}
            target="_blank"
            className="text-center ml-2 text-cyan-200 text-sm"
          >
            (maps)
          </a>
          <div className="flex mt-5 items-center justify-evenly gap-2">
            {event.place.tags.map((tag) => (
              <PlaceTag tag={tag} key={tag.id} />
            ))}
          </div>
        </div>
      </Card>
      <Chat chatableId={event.id} chatableType='Event' />
    </div>
  );
}
