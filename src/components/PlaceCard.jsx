import { useRouter } from "next/navigation";
import { PlaceTag } from "./place_tag";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";

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
      className="w-full max-w-[450px] cursor-pointer"
      onClick={() => place_clicked(place)}
    >
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl neon_cyan_text text-ellipsis overflow-hidden truncate">
            {place.name}
          </h2>
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
