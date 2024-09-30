"use client";
import { EventsList } from "@/components/lists/EventsList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Events() {
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("events");

  return (
    <div className="mx-4 mb-4">
      <div className="relative w-full max-w-[350px] mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="What are you looking for?"
          onChange={(ev) => setSearchText(ev.target.value)}
          className="pl-8"
        />
      </div>

      <EventsList searchText={searchText} />
    </div>
  );
}

