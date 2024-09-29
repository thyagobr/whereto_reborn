"use client"
import { NextPage } from "next";
import { Roboto } from "next/font/google";
import { PlaceTag } from "@/components/place_tag";
const RobotoFont = Roboto({ weight: "300", subsets: ["latin"] });
import PlaceEvents from "@/components/place_events";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  console.log(id);

  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/places/${id}`)
      .then((res) => res.json())
      .then((res) => setPlace(res.data));
  }, [id]);

  if (!place)
    return (
      <>
        <h2>Place not found</h2>
      </>
    );
  return (
    <>
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

      <div>
        <h2 className="text-center w-full text-2xl neon_cyan_text">Events</h2>
        <div className="flex flex-col items-center mt-10">
          <Link href={`/places/${place.id}/events/new`} className="mb-1">
            <button className="btn px-3 py-2 neon_border_purple neon_cyan_text my-2">
              Create new event
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center mt-10 px-5">
          {place.events?.length === 0 ? (
            <>
              <p>No events.</p>
              <Link href={`/places/${place.id}/events/new`} className="mt-5">
                <button className="btn px-3 py-2 neon_border_purple neon_cyan_text my-2">
                  Want to create one?
                </button>
              </Link>
            </>
          ) : (
            <PlaceEvents placeId={id} />
          )}
        </div>
      </div>
    </>
  );
};

export default PagesShow;
