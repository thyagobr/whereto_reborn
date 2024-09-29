"use client";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlaceCard } from "@/components/place_card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const RobotoFont = Roboto({ weight: "300", subsets: ["latin"] });

export default function Home() {
  // Place fetching
  // TODO: understand why this call is being done twice
  // const places = useRef([])
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((res) => res.json())
      .then((res) => setPlaces(res.places))
      .catch((err) => setError(true));
  }, []);

  const [search_text, set_search_text] = useState("");
  const [error, setError] = useState(false);

  if (!places) return null;

  const filteredPlaces = (search_text) => {
    return places.filter((place) => {
      return (
        place.name.toLowerCase().indexOf(search_text.toLowerCase()) != -1 ||
        place.tags.some(
          (tag) =>
            tag.text.toLowerCase().indexOf(search_text.toLowerCase()) != -1
        )
      );
    });
  };

  if (error) {
    return <h1 className="text-white">The server is not responding</h1>;
  }

  return (
    <div className="mx-4 mb-4">
      <div className="relative w-full max-w-[350px] mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Which place?"
          onChange={(ev) => set_search_text(ev.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex flex-col items-center mt-10 gap-4">
        {filteredPlaces(search_text).map((place, i) => (
          <PlaceCard key={place.id} place={place} />
        ))}

        {filteredPlaces(search_text).length == 0 && (
          <div className="flex flex-col gap-3 items-center">
            <h3>{`No places called ${search_text}.`}</h3>
            <Link href={`/places/new?name=${search_text}`}>
              <Button>Want to create one?</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
