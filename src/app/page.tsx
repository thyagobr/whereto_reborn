"use client";
import { PlacesList } from "@/components/lists/PlacesList/PlacesList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("home");
  const router = useRouter();

  return (
    <div className="mx-4 mb-4">
      <div className="flex items-center gap-3 w-fit mx-auto">
        <div className="relative w-full max-w-[350px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Which place?"
            onChange={(ev) => setSearchText(ev.target.value)}
            className="pl-8"
          />
        </div>
        <Button size="sm" onClick={() => router.push("/places/new")}>
          Add new
        </Button>
      </div>

      <PlacesList searchText={searchText} />
    </div>
  );
}
