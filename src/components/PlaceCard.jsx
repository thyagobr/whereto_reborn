"use client";

import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { PlaceTag } from "./place_tag";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { useDeletePlace } from "@/hooks/places/useDeletePlace";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function PlaceCard({ place }) {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { trigger: deletePlace, isLoading: isDeleting } = useDeletePlace(place?.id);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  const place_clicked = (place) => {
    router.push(`/places/${place.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePlace();
      setDeleteDialogOpen(false);
      mutate({ url: "/places" });
      toast({
        title: "Place deleted",
        description: "The place has been removed.",
      });
    } catch (err) {
      toast({
        title: "Could not delete place",
        description: err?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card
        key={place.id}
        className="last:border-b-[1px] w-full max-w-[600px] cursor-pointer border-slate-800  border-0 border-t-[1px] border-r-0 rounded-none"
        onClick={() => place_clicked(place)}
      >
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl line-clamp-1">{place.name}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href={`https://www.google.com/maps/search/${place.name}+${place.address}`}
            target="_blank"
          >
            {place.address}
          </a>
          <Separator className="mt-4" />
          <div className="flex flex-wrap mt-3 gap-2">
            {place.tags.map((tag) => (
              <PlaceTag tag={tag} key={tag.id} />
            ))}
          </div>
          {isAdmin && (
            <div className="mt-4">
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={handleDeleteClick}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Delete place</DialogTitle>
            <DialogDescription>
              Delete &quot;{place.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
