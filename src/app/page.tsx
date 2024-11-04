"use client";
import { PlacesList } from "@/components/lists/PlacesList/PlacesList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  return (
    <div className="mb-4 min-h-screen">
      <div className="flex items-center max-w-[600px] px-3 mt-3">
        <div className="relative z-0 w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Which place?"
            onChange={(ev) => setSearchText(ev.target.value)}
            className="pl-8 rounded-r-none border-r-0"
          />
        </div>
        <Button
          size="sm"
          className="rounded-l-none h-[40px]"
          onClick={() => router.push("/places/new")}
        >
          Add new
        </Button>
      </div>
      {/* Feed */}
      <div className="w-full max-w-[600px] mx-auto mt-3">
        <PlacesList searchText={searchText} />
      </div>
    </div>
  );
}
