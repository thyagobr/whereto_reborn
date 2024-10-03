import Link from "next/link";
import { PlaceEvents } from "@/components/PlaceEvents";
import { Button } from "@/components/ui/button";
import { useGetPlaceEvents } from "@/hooks/places/useGetPlaceEvents";
import PlaceEvent from "@/components/PlaceEvent";

export const PlaceEventsList = ({ place }) => {
  const placeId = place?.id;
  const { events, error, isLoading } = useGetPlaceEvents(placeId);

  if (!place) {
    return (
      <>
        <p>No place given.</p>
      </>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-[450px] text-center mx-auto mt-10">
        <p>No events for {place.name}</p>
        <Link href={`/events/new?placeId=${placeId}`} className="mt-5">
          <Button>
            Want to create one?
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[450px] text-center mx-auto mt-10">
      <div className="flex flex-col items-center mt-10">
        <Link href={`/events/new?placeId=${placeId}`} className="mb-1">
          <Button>
            Create new event
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center mt-10 px-5">
        {events.map((event) => (
          <PlaceEvent event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
};
