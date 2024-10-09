"use client";
import { EventsList } from "@/components/lists/EventsList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FeedTabs } from "@/components/Feed/FeedTabs/FeedTabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Events() {
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("events");
  const router = useRouter();

  return (
    <div className="mb-4">
      <FeedTabs />
      <div className="flex items-center mx-auto max-w-[600px] px-3 sm:px-0 mt-3">
        <div className="relative z-0 w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="What are you looking for?"
            onChange={(ev) => setSearchText(ev.target.value)}
            className="pl-8 rounded-r-none border-r-0"
          />
        </div>
        <Button
          size="sm"
          className="rounded-l-none h-[40px]"
          onClick={() => router.push("/events/new")}
        >
          Add new
        </Button>
      </div>
      {/* Feed */}
      <div className="md:border-slate-800 md:border-x-[1px] border-b-[1px] w-full max-w-[600px] mx-auto mt-3">
        <EventsList searchText={searchText} />
      </div>
    </div>
  );
}
