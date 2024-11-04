import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { PlaceTag } from "./place_tag";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// export type Place = {
//     id?: string;
//     name: string;
//     address: string;
//     tags: [];
//     events: Event[];
//     createdAt?: Date;
//     updatedAt?: Date;
// }

// export type Event = {
//     name: string;
//     date: string;
//     url: string;
// }

export function PlaceCard({ place }) {
  const router = useRouter();
  const place_clicked = (place) => {
    router.push(`/places/${place.id}`);
  };

  return (
    <Card
      key={place.id}
      className="last:border-b-[1px] w-full max-w-[600px] cursor-pointer border-slate-800  border-0 border-t-[1px] border-r-0 rounded-none"
      onClick={() => place_clicked(place)}
    >
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl line-clamp-1">{place.name}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <a
          href={`https://www.google.com/maps/search/${place.name}+${place.address}`}
          target="_blank"
        >
          {place.address}
        </a>
        <Separator className="mt-4" />
        <div className="flex flex-wrap mt-3 gap-2">
          {place.tags.map((tag) => (
            <PlaceTag tag={tag} key={tag.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
