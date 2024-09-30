import Link from "next/link";
import { PlaceEvents } from "@/components/PlaceEvents";
import { Button } from "@/components/ui/button";

export const PlaceEventsList = ({ place }) => {
  const placeId = place.id;

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <Link href={`/places/${placeId}/events/new`} className="mb-1">
          <Button>
            Create new event
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center mt-10 px-5">
        {place.events?.length === 0 ? (
          <>
            <p>No events.</p>
            <Link href={`/places/${placeId}/events/new`} className="mt-5">
              <Button>
                Want to create one?
              </Button>
            </Link>
          </>
        ) : (
            <PlaceEvents place={place} />
          )}
      </div>
    </>
  );
};
