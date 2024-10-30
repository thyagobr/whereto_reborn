"use client";
import { EditEventForm } from "@/components/forms/EditEventForm";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useEffect, useState } from "react";

export default function EditEvent({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);

  const { events } = useGetEvent(id);

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
