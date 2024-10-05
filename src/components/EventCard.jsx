import { useRouter } from "next/navigation";
import { PlaceTag } from "@/components/place_tag";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from 'lucide-react';
import { useToggleInterest } from "@/hooks/interests/useToggleInterest";

export function EventCard({ event }) {
  const router = useRouter();
  const [interested, setInterested] = React.useState(event.interested);
  const event_clicked = (event) => {
    router.push(`/events/${event.id}`);
  };

  const { trigger } = useToggleInterest(event.id);

  const toggleInterest = () => {
    trigger();
    event.interested = !interested;
    setInterested(!interested);
  }

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
          {event.place.tags.length === 0 && <div className="text-muted">No tags</div>}
          {event.place.tags.map((tag) => (
            <PlaceTag tag={tag} key={tag.id} />
          ))}
        </div>
        <Separator className="mt-4"/>
        <div className="mt-5">
          <Eye className={`w-5 h-5 ${interested ? "text-red-500" : "text-white-500"}`} onClick={toggleInterest}/>
        </div>
      </CardContent>
    </Card>
  );
}
