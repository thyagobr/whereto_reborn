"use client"
import { NextPage } from "next";
import { Roboto } from "next/font/google";
import { PlaceTag } from "@/components/place_tag";
const RobotoFont = Roboto({ weight: "300", subsets: ["latin"] });
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlaceEventsList } from "@/components/lists/PlaceEventsList/PlaceEventsList";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useGetPlaces } from "@/hooks/places/useGetPlaces";

export type PlaceAttributes = {
  name: string;
  address: string;
  Tags: PlaceTag[];
  events: Event[];
};

export type TagAttributes = {
  text: string;
};

const PagesShow: NextPage = ({ params: { id } }: any) => {
  const { places, isLoading } = useGetPlaces({ id });

  if (!places || places.length === 0) {
    return <h2>Place not found</h2>
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const place = places[0];

  return (
    <div className="flex flex-col gap-3 mt-5">
      <Card className="w-full max-w-[450px] mx-auto p-5">
        <div
          className={`flex flex-col items-center px-5 py-10 gap-3 ${RobotoFont.className}`}
        >
          <h2 className="text-center w-full text-2xl neon_cyan_text">
            {place.name}
          </h2>
          <p className="text-center w-full text-sm">{place.address}</p>
          <a
            href={`https://www.google.com/maps/search/${place.name}+${place.address}`}
            target="_blank"
            className="text-center ml-2 text-cyan-200 text-sm"
          >
            (maps)
          </a>
          <div className="flex mt-5 items-center justify-evenly gap-2">
            {place.tags.map((tag) => (
              <PlaceTag tag={tag} key={tag.id} />
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-10">
        <h2 className="text-center w-full text-2xl neon_cyan_text">Events</h2>

        <PlaceEventsList place={place} />
      </div>
    </div>
  );
};

export default PagesShow;
