"use client";

import { Backlink } from "@/components/Backlink/Backlink";
import { NewSquadForm } from "@/components/forms/NewSquadForm";

export default function NewCrewPage() {
  return (
    <div className="w-full max-w-[450px] mx-auto mt-4 px-3">
      <Backlink />

      <h1 className="text-2xl mb-4">Create a new crew</h1>
      <NewSquadForm />
    </div>
  );
} 
