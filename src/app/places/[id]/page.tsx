/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PlaceEventsList } from "@/components/lists/PlaceEventsList/PlaceEventsList";
import { PlaceTag } from "@/components/place_tag";
import { Card } from "@/components/ui/card";
import { useGetPlaces } from "@/hooks/places/useGetPlaces";
import { NextPage } from "next";
import { FeedTabs } from "@/components/Feed/FeedTabs/FeedTabs";
import { LoadSpinner } from "@/components/LoadSpinner/LoadSpinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type PlaceAttributes = {
  name: string;
  address: string;
  Tags: (typeof PlaceTag)[];
  events: Event[];
};

export type TagAttributes = {
  text: string;
};

const PagesShow: NextPage = ({ params: { id } }: any) => {
  const { place, isLoading } = useGetPlaces({ id });

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold text-white mb-4">Place Not Found</h1>
        <p className="text-lg text-gray-400 mb-6">
          Sorry, we couldn't find the place you're looking for.
        </p>
        <Link href="/">
          <Button>Back to Places</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-5">
      <Card className="w-full max-w-[450px] mx-auto p-5">
        <div className={`flex flex-col items-center px-5 py-10 gap-3`}>
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
          <div className="flex flex-wrap mt-5 items-center gap-2">
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
