"use client";

import { EditPlaceForm } from "@/components/forms/EditPlaceForm";
import { useGetPlaces } from "@/hooks/places/useGetPlaces";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Backlink } from "@/components/Backlink/Backlink";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditPlacePage({ params }: { params: { id: string } }) {
  const isAuth = useRequireAuth();
  if (!isAuth) return null;

  const { id } = params;
  const { place, error, isLoading } = useGetPlaces({ id });

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error || !place) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold text-white mb-4">Place not found</h1>
        <Link href="/">
          <Button>Back to places</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="my-3 ml-1">
        <Backlink />
      </div>
      <div className="mx-3">
        <h1 className="text-2xl mb-4">Edit place</h1>
        <EditPlaceForm place={place} />
      </div>
    </div>
  );
}
