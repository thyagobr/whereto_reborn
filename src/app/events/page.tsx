"use client";
import { EventsList } from "@/components/lists/EventsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIsAuthenticated } from "@/lib/useIsAuthenticated";

export default function Events() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const isAuth = useIsAuthenticated();

  return (
    <div className="mb-4">
      <div className="flex items-center mx-auto max-w-[600px] px-3 mt-3">
        <div className="relative z-0 w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="What are you looking for?"
            onChange={(ev) => setSearchText(ev.target.value)}
            className="pl-8 rounded-r-none border-r-0"
          />
        </div>
        {isAuth && (
          <Button
            size="sm"
            className="rounded-l-none h-[40px]"
            onClick={() => router.push(`/events/new?name=${encodeURIComponent(searchText)}`)}
          >
            Add new
          </Button>
        )}
      </div>
      {/* Feed */}
      <div className="w-full max-w-[600px] mx-auto mt-3">
        <EventsList searchText={searchText} />
      </div>
    </div>
  );
}
