import { CardSkeleton } from "@/components/CardSkeleton";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useGetEvents } from "@/hooks/events/useGetEvents";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useIsAuthenticated } from "@/lib/useIsAuthenticated";

export const EventsList = ({ searchText }) => {
  const { events, error, isLoading } = useGetEvents();
  const searchParams = useSearchParams();
  const isAuth = useIsAuthenticated();
  const filterInterest =
    searchParams.get("interests")?.toLowerCase() === "true";

  if (error) {
    return <h1 className="text-white">The server is not responding</h1>;
  }

  if (isLoading) {
    return (
      <div className="mt-6 gap-4 flex flex-col border-slate-800 border-b-[1px]">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const filteredEvents = events.filter((event) => {
    const shouldReturnEvent =
      event.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
      event.place.tags.some(
        (tag) => tag.text.toLowerCase().indexOf(searchText.toLowerCase()) != -1
      );
    if (filterInterest) {
      return event.interested && shouldReturnEvent;
    } else {
      return shouldReturnEvent;
    }
  });

  if (filteredEvents.length == 0 || !events) {
    return (
      <div className="mt-10 flex flex-col gap-3 items-center">
        <h3>{`No events for ${searchText}.`}</h3>
        {isAuth && (
          <Link href={`/events/new?name=${encodeURIComponent(searchText)}`}>
            <Button>Want to create one?</Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
