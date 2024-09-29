"use client";
import { PlacesList } from "@/components/lists/PlacesList/PlacesList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="mx-4 mb-4">
      <div className="relative w-full max-w-[350px] mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Which place?"
          onChange={(ev) => setSearchText(ev.target.value)}
          className="pl-8"
        />
      </div>

      <PlacesList searchText={searchText} />
    </div>
  );
}
