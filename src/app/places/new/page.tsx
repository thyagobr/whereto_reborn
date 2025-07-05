"use client";
import { Backlink } from "@/components/Backlink/Backlink";
import { NewPlaceForm } from "@/components/forms/NewPlaceForm";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const PagesNew: NextPage = () => {
  const isAuth = useRequireAuth();
  if (!isAuth) return null;
  const searchParams = useSearchParams();
  const defaultName = searchParams.get("name") || "";
  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="my-3 ml-1">
        <Backlink />
      </div>
      <div className="mx-3">
        <h1 className="text-2xl mb-4">Place information</h1>
        <NewPlaceForm defaultName={defaultName} />
      </div>
    </div>
  );
};

export default PagesNew;
