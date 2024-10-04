import { CardSkeleton } from "@/components/CardSkeleton";
import { PlaceCard } from "@/components/PlaceCard";
import { Button } from "@/components/ui/button";
import { useGetPlaces } from "@/hooks/places/useGetPlaces";
import Link from "next/link";

export const PlacesList = ({ searchText }) => {
  const { places, error, isLoading } = useGetPlaces();

  if (error) {
    return <h1 className="text-white">The server is not responding</h1>;
  }

  if (isLoading) {
    return (
      <div className="mt-6 gap-4 flex flex-col">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const filteredPlaces = places.filter((place) => {
    return (
      place.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
      place.tags.some(
        (tag) => tag.text.toLowerCase().indexOf(searchText.toLowerCase()) != -1
      )
    );
  });

  if (filteredPlaces.length == 0 || !places) {
    return (
      <div className="mt-6 flex flex-col gap-3 items-center">
        <h3>{`No places called ${searchText}.`}</h3>
        <Link href={`/places/new?name=${searchText}`}>
          <Button>Want to create one?</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      {filteredPlaces.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
};
