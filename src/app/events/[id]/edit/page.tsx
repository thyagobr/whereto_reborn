"use client"
import { Card } from "@/components/ui/card";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlaceTag } from "@/components/place_tag";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditEventForm } from "@/components/forms/EditEventForm";

export default function EditEvent({ params }) {
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
      <EditEventForm event={event} />
    </div>
  );
}

