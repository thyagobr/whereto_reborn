"use client";
import { Chat } from "@/components/Chat";
import { PlaceTag } from "@/components/place_tag";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Photos } from "@/components/Photos";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useUser } from "@/hooks/users/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FeedTabs } from "@/components/Feed/FeedTabs/FeedTabs"; import { LoadSpinner } from "@/components/LoadSpinner/LoadSpinner";

export default function ShowEvent({ params }) {
  const { id } = params;
  //const [event, setEvent] = useState(null);

  const { event, isLoading } = useGetEvent(id);
  const { user } = useUser();

  const [tab, setTab] = useState("chat");

  // useEffect(() => {
  //   if (!events) return;
  //   setEvent(events[0]);
  // }, [events]);

  if (isLoading) {
    return <LoadSpinner />;
  }

  console.log("Event:", event);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold text-white mb-4">Event Not Found</h1>
        <p className="text-lg text-gray-400 mb-6">
          Sorry, we couldn't find the event you're looking for.
        </p>
        <Link href="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
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
          <p>{event.description}</p>
          <div className="flex mt-5 items-center justify-evenly gap-2">
            {event.tags?.map((tag) => (
              <PlaceTag tag={tag} key={tag.id} />
            ))}
          </div>
        </div>
        <div>
          {user?.role === "admin" && (
            <div className="flex justify-center">
              <Link href={`/events/${event.id}/edit`}>
                <Button className="bg-rose-500 hover:bg-rose-900">Edit</Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
      <div className="mt-10">
        <div className="w-full flex justify-around max-w-[450px] m-auto">
          <button
            onClick={() => setTab("chat")}
            className="bg-slate-800 py-1 px-3 rounded">
            Chat
          </button>
          <button
            onClick={() => setTab("photos")}
            className="bg-slate-800 py-1 px-3 rounded">
            Photos
          </button>
        </div>
        {tab === "chat" && <Chat chatableId={event.id} chatableType="Event" />}
        {tab === "photos" && <Photos photoable={event} photoableType="event" />}
      </div>
    </div>
  );
}
