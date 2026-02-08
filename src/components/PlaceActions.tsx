"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useDeletePlace } from "@/hooks/places/useDeletePlace";

export function PlaceActions({ place }) {
  const isAdmin = useIsAdmin();
  const { trigger: deletePlace, isLoading: isDeleting } = useDeletePlace(place?.id);
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    toast.promise(
      deletePlace(),
      {
        loading: "Deleting place...",
        success: async (result) => {
          setDeleteDialogOpen(false);
          router.push(`/`);
          return "Place deleted successfully";
        },
        error: (err) => {
          console.log(err) || err?.message || "Could not delete place. Please try again."
          return err.message || "Could not delete place. Please try again.";
        }
      },
    );
  };

  return (
    <>
    {isAdmin && (
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-amber-300/70 bg-amber-50/80 text-amber-800 hover:bg-amber-100/90 hover:border-amber-400/70"
        >
          <Link
            href={`/places/${place.id}/edit`}
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Link>
        </Button>
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
