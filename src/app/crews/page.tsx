"use client";

import { useGetCrews } from "@/hooks/crews/useGetCrews";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CrewsPage() {
  const { crews, isLoading, error } = useGetCrews();

  return (
    <div className="w-full max-w-[450px] mx-auto mt-4 px-3">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">My Crews</h1>
        <Link href="/crews/new">
          <Button size="sm">Create new crew</Button>
        </Link>
      </div>

      <div className="mt-6">
        {isLoading && <p>Loading crews...</p>}
        {error && <p className="text-red-500">Error loading crews</p>}
        {crews && crews.length === 0 && <p>You are not part of any crew yet.</p>}
        {crews && crews.length > 0 && (
          <ul className="flex flex-col gap-3">
            {crews.map((crew) => (
              <li
                key={crew.id}
                className="border p-3 rounded-md bg-card text-card-foreground hover:bg-muted cursor-pointer"
                onClick={() => window.location.assign(`/crews/${crew.id}`)}
              >
                <h3 className="font-semibold">{crew.name}</h3>
                {crew.description && <p className="text-sm">{crew.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 
