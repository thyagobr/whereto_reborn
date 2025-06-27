"use client";

import { Backlink } from "@/components/Backlink/Backlink";
import { useGetCrew } from "@/hooks/crews/useGetCrew";
import { useParams } from "next/navigation";
import { InviteMemberForm } from "@/components/forms/InviteMemberForm";

export default function CrewShowPage() {
  const params = useParams();
  const { crew, isLoading, error } = useGetCrew(params?.id as string);

  return (
    <div className="w-full max-w-[450px] mx-auto mt-4 px-3">
      <Backlink />
      {isLoading && <p>Loading crew...</p>}
      {error && <p className="text-red-500">Error loading crew</p>}
      {crew && (
        <>
          <h1 className="text-2xl mb-2 font-bold">{crew.name}</h1>
          {crew.description && <p className="mb-4 text-muted-foreground">{crew.description}</p>}
          <InviteMemberForm crewId={crew.id} />
        </>
      )}
    </div>
  );
} 
