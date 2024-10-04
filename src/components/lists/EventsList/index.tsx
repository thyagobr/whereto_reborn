import { CardSkeleton } from "@/components/CardSkeleton";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useGetEvents } from "@/hooks/events/useGetEvents";
import Link from "next/link";

export const EventsList = ({ searchText }) => {
  const { events, error, isLoading } = useGetEvents();

  if (error) {
    return <h1 className="text-white">The server is not responding</h1>;
  }

  console.log(events);

  if (isLoading) {
    return (
      <div className="mt-10 gap-4 flex flex-col">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
      event.place.tags.some(
        (tag) => tag.text.toLowerCase().indexOf(searchText.toLowerCase()) != -1
      )
    );
  });

  if (filteredEvents.length == 0 || !events) {
    return (
      <div className="mt-10 flex flex-col gap-3 items-center">
        <h3>{`No events for ${searchText}.`}</h3>
        <Link href={`/events/new?name=${searchText}`}>
          <Button>Want to create one?</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

