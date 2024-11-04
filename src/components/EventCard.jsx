import { PlaceTag } from "@/components/place_tag";
import { Separator } from "@/components/ui/separator";
import { useToggleInterest } from "@/hooks/interests/useToggleInterest";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function EventCard({ event }) {
  const router = useRouter();
  const [interested, setInterested] = React.useState(event.interested);
  const event_clicked = (event) => {
    router.push(`/events/${event.id}`);
  };

  const { trigger } = useToggleInterest(event.id);

  const toggleInterest = (event) => {
    event.stopPropagation();
    trigger();
    event.interested = !interested;
    setInterested(!interested);
  };

  return (
    <Card
      onClick={() => event_clicked(event)}
      key={event.id}
      className="last:border-b-[1px] w-full max-w-[600px] cursor-pointer border-slate-800  border-0 border-t-[1px] border-r-0 rounded-none"
    >
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl line-clamp-1">{event.name}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>{event.start_at}</div>
        <div className="text-xl">{event.place.name}</div>
        <a
          href={`https://www.google.com/maps/search/${event.place.name}+${event.place.address}`}
          target="_blank"
        >
          {event.place.address}
        </a>
        <Separator className="mt-4" />
        <div className="flex mt-3 gap-2">
          {event.place.tags.length === 0 && (
            <div className="text-muted">No tags</div>
          )}
          {event.place.tags.map((tag) => (
            <PlaceTag tag={tag} key={tag.id} />
          ))}
        </div>
        <Separator className="mt-4" />
        <div className="mt-5">
          <Eye
            className={`w-5 h-5 ${
              interested ? "text-red-500" : "text-white-500"
            }`}
            onClick={toggleInterest}
          />
        </div>
      </CardContent>
    </Card>
  );
}
