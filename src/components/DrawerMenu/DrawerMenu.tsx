"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Home, MapPin, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserBadge } from "../UserBadge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <AlignJustify className="m-1" color="#8c9eb2" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <UserBadge />
            <h3 className="w-fit mt-4">Meu nome</h3>
            <p className="w-fit mt-1 font-light text-slate-500 text-xs">
              e-mail@mail.com
            </p>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 mt-1">
          <Separator />
          <div className="w-full">
            <Button
              onClick={() => navigate("/")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <Home color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Home</p>
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={() => navigate("/")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <MapPin color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Places</p>
            </Button>
          </div>
          <div className="w-full">
            <Button
              onClick={() => navigate("/events")}
              className="w-full justify-start gap-3 pl-0"
              variant="ghost"
            >
              <Ticket color="#64748b" />
              <p className="font-bold text-lg text-slate-500">Events</p>
            </Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
