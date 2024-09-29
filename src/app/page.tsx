"use client";
import { PlacesList } from "@/components/lists/PlacesList/PlacesList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("home");

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
      <h1 className="text-2xl font-bold mt-4">{t("takeALook")}</h1>

      <PlacesList searchText={searchText} />
    </div>
  );
}
